import request from 'supertest';
import app from '../server.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Test from 'supertest/lib/test.js';

// Mock bcrypt.hash to immediately resolve
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation((data, salt, callback) => {
    callback(null, 'hashedPassword');
  }),
}));


////////////////// fetch meals //////////////////////
describe('GET /meals', () => {
  jest.setTimeout(10000);

  test('responds with a JSON object containing meal data', async () => {
    const response = await request(app)
      .get('/meals')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('meals');
    expect(Array.isArray(response.body.meals)).toBe(true);
  });
});

////////////////// authentication test cases //////////////////////
describe('verifyUser middleware', () => {
  test('throws an error if no token is present', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(401);
    expect(response.body.Error).toBe('Authentication error: Token missing');
  });

  test('throws an error if the token is invalid', async () => {
      const token = 'invalid_token';
      const response = await request(app)
        .get('/')
        .set('Cookie', [`token=${token}`]);
      expect(response.statusCode).toBe(401);
      expect(response.body.Error).toBe('Authentication error: Invalid token');
  });

  test('returns the username if the token is valid', async () => {
    const token = jwt.sign({ username: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const response = await request(app)
      .get('/')
      .set('Cookie', [`token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body.Status).toBe('Success');
    expect(response.body.username).toBe('testuser');
  });
});


////////////////REGISTER//////////////////////////////////

describe('POST /register', () => {
  
  test('handles hashing error', async () => {
    bcrypt.hash.mockImplementationOnce((data, salt, callback) => {
      callback(new Error('Hashing error')); 
    });
    const userData = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
    const response = await request(app)
      .post('/register')
      .send(userData);
    expect(response.statusCode).toBe(500); 
    expect(response.body.Error).toBe('Error hashing');
  });
});

///////////////////////////////////LOGIN/////////////////////////////////////

describe('POST /login', () => {

  test('returns an error with missing email', async () => {
    const userData = { password: 'testpassword' };
    const response = await request(app)
      .post('/login')
      .send(userData);
    expect(response.statusCode).toBe(400);
    expect(response.body.Error).toBe('Email and password are required');
  });

  test('returns an error with missing password', async () => {
    const userData = { email: 'test@example.com' };
    const response = await request(app)
      .post('/login')
      .send(userData);
    expect(response.statusCode).toBe(400);
    expect(response.body.Error).toBe('Email and password are required');
  });
});

describe('GET /logout', () => {
  it('revokes the token and clears the cookie', async () => {
    const response = await request(app)
      .get('/logout');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Status: 'Success' });
    expect(response.header['set-cookie'][0]).toMatch(/^token=;/);
  });
});


jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
      query: jest.fn((sql, callback) => {
          if (sql === "SELECT * FROM menu") {
              // Simulate successful query execution
              const mockMenu = [
                  { foodID: 1, foodName: 'Burger', foodDesc: 'Juicy beef patty in a sesame seed bun', category: 'coffee', price: 899 },
                  { foodID: 2, foodName: 'Fries', foodDesc: 'Crispy golden fries', category: 'snack', price: 349 }
              ];
              callback(null, mockMenu);
          } else {
              // Simulate database error
              callback(new Error('Database error'), null);
          }
      })
  }))
}));


describe('GET /menu', () => {
    it('should return menu items', async () => {
        const response = await request(app).get('/menu');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            Status: 'Success',
            menu: [
                { foodID: 1, foodName: 'Burger', foodDesc: 'Juicy beef patty in a sesame seed bun', category: 'coffee', price: 899 },
                { foodID: 2, foodName: 'Fries', foodDesc: 'Crispy golden fries', category: 'snack', price: 349 }
            ]
        });
    });
});