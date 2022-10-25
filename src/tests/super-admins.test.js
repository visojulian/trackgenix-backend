import request from 'supertest';
import app from '../app';
import superAdmins from '../models/Super-admins';
import superAdminSeed from '../seeds/super-admins';

describe('Super-Admins - Unit tests', () => {
  beforeAll(async () => {
    await superAdmins.collection.insertMany(superAdminSeed);
  });

  describe('GET /super-admins', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/super-admins').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super admins found');
    });
  });

});
