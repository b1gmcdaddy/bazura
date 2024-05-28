import request from 'supertest';
import app from '../server.js';

// Mock MySQL database connection and queries
jest.mock('mysql', () => {
  const queryMock = jest.fn((sql, values, callback) => {
    if (sql.startsWith('UPDATE menu SET')) {
      callback(null, { affectedRows: 1 });
    }
  });

  return {
    createConnection: jest.fn(() => ({
      query: queryMock,
      end: jest.fn()
    })),
  };
});

describe('PUT /menu/:id', () => {
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  test('successfully updates a food item', async () => {
    const updatedFood = {
      foodName: 'Updated Pizza',
      foodDesc: 'Delicious updated cheese pizza',
      price: 10.99,
    };

    const response = await request(app).put('/menu/1').send(updatedFood);

    expect(response.statusCode).toBe(200);
    expect(response.body.Status).toBe('Success');
  });
});
