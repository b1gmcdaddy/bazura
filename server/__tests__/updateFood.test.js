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

  describe('When updated food data is invalid', () => {
    test('returns 400 when foodName is missing', async () => {
      const updatedFood = {
        foodDesc: 'Delicious updated cheese pizza',
        price: 10.99,
      };

      const response = await request(app).put('/menu/1').send(updatedFood);

      expect(response.statusCode).toBe(400);
      expect(response.body.Error).toBe('Invalid food data');
    });
    test('returns 400 when foodDesc is missing', async () => {
      const updatedFood = {
        foodName: 'chicken',
        price: 10.99,
      };

      const response = await request(app).put('/menu/1').send(updatedFood);

      expect(response.statusCode).toBe(400);
      expect(response.body.Error).toBe('Invalid food data');
    });
    test('returns 400 when price is missing', async () => {
      const updatedFood = {
        foodDesc: 'Delicious updated cheese pizza',
        foodName: 'chicken',
      };

      const response = await request(app).put('/menu/1').send(updatedFood);

      expect(response.statusCode).toBe(400);
      expect(response.body.Error).toBe('Invalid food data');
    });
  })

  
});