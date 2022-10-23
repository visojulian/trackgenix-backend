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

  describe('GET BY ID /:id', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).get('/employees/634d5803354e41cd60b9e400').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employee found');
    });
  });

  describe('GET BY ID ERROR /:id', () => {
    test('Should return status code 404', async () => {
      const response = await request(app).get('/time-sheets/634d5803354e41cd60b9e555').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });
});
