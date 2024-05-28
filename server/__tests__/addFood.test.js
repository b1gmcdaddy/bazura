import request from 'supertest';
import app from '../server.js';
import bcrypt from 'bcrypt';

// Mock bcrypt.hash to immediately resolve
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation((data, salt, callback) => {
    callback(null, 'hashedPassword');
  }),
}));

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

});
