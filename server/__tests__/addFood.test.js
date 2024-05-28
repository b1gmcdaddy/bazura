import request from 'supertest';
import app from '../server.js';


// Mock MySQL database connection and queries
jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    query: jest.fn((sql, values, callback) => {
      if (sql.startsWith('INSERT INTO menu')) {
        callback(null, { insertId: 1 });
      } else {
        callback(new Error('Database error'), null);
      }
    }),
  })),
}));

describe('POST /addFood', () => {
  test('successfully adds a new food item', async () => {
    const newFood = {
      foodName: 'Pizza',
      foodDesc: 'Delicious cheese pizza',
      category: 'Italian',
      price: 9.99,
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(200);
    expect(response.body.Status).toBe('Success');
    expect(response.body.addedFoodId).toBe(1);
  });

  test('returns 400 error when foodName is missing', async () => {
    const newFood = {
      foodDesc: 'Delicious cheese pizza',
      category: 'Italian',
      price: 9.99,
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(400);
    // expect(response.body.Error).toBe('Food name is required');
  });

  test('returns 400 error when foodDesc is missing', async () => {
    const newFood = {
      foodName: 'Pizza',
      category: 'Italian',
      price: 9.99,
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(400);
    // expect(response.body.Error).toBe('Food description is required');
  });

  test('returns 400 error when category is missing', async () => {
    const newFood = {
      foodName: 'Pizza',
      foodDesc: 'Delicious cheese pizza',
      price: 9.99,
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(400);
    // expect(response.body.Error).toBe('Food category is required');
  });

  test('returns 400 error when price is missing', async () => {
    const newFood = {
      foodName: 'Pizza',
      foodDesc: 'Delicious cheese pizza',
      category: 'Italian',
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(400);
    // expect(response.body.Error).toBe('Food price is required');
  });

  test('returns 400 error when price is not a number', async () => {
    const newFood = {
      foodName: 'Pizza',
      foodDesc: 'Delicious cheese pizza',
      category: 'Italian',
      price: 'not a number',
    };

    const response = await request(app)
      .post('/addFood')
      .send(newFood);

    expect(response.statusCode).toBe(400);
    expect(response.body.Error).toBe('price must be a number');
  });

});



