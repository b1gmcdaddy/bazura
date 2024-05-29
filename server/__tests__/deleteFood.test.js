import request from 'supertest';
import app from '../server.js';

// Mock MySQL database connection and queries
jest.mock('mysql', () => {
  const queryMock = jest.fn((sql, values, callback) => {
    if (sql.startsWith('DELETE FROM menu WHERE foodID = ?')) {
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



describe('DELETE /menu/:id', () => {
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  test('successfully deletes a food item', async () => {
    const response = await request(app).delete('/menu/1').send();

    expect(response.statusCode).toBe(200);
    expect(response.body.Status).toBe('Success');
  });

});
