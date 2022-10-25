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

  describe('GET BY ID /super-admins/:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/super-admins/63557f5186b431bda635cd0c').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });

    test('should return status code 400', async () => {
      const response = await request(app).get('/super-admins/63557f5186b431bda635ee').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('An error ocurred!');
    });
  });
});
