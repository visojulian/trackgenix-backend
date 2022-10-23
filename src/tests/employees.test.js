import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

describe('Time-sheet - Unit tests', () => {
  beforeAll(async () => {
    await Employees.collection.insertMany(employeesSeed);
  });

  describe('GET /employees', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).get('/employees').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employees found');
    });
  });
});
