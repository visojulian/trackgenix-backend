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

  describe('POST /super-admins', () => {
    test('should create a super-admin and return status 201', async () => {
      const superAdminMooked = {
        name: 'Sussy',
        lastName: 'Flores',
        email: 'csomerled2@4shared.com',
        password: 'Pi44re12',
      };
      const response = await request(app).post('/super-admins').send(superAdminMooked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super Admin created successfuly');
    });

    test('should return status code 400 when a super admin is not created because it did not pass validation in name', async () => {
      const superAdminMooked = {
        name: '',
        lastName: 'Mickan',
        email: 'lmickan9@sun.com',
        password: 'ChangePassword1',
      };
      const response = await request(app).post('/super-admins/').send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
    });

    test('should return status code 400 when a super admin is not created because it did not pass validation in lastName', async () => {
      const superAdminMooked = {
        name: 'Liza',
        lastName: '',
        email: 'lmickan9@sun.com',
        password: 'ChangePassword1',
      };
      const response = await request(app).post('/super-admins/').send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "lastName" is not allowed to be empty');
    });

    test('should return status code 400 when a super admin is not created because it did not pass validation in email', async () => {
      const superAdminMooked = {
        name: 'Liza',
        lastName: 'Mickan',
        email: '',
        password: 'ChangePassword1',
      };
      const response = await request(app).post('/super-admins/').send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "email" is not allowed to be empty');
    });

    test('should return status code 400 when a super admin is not created because it did not pass validation in password', async () => {
      const superAdminMooked = {
        name: 'Liza',
        lastName: 'Mickan',
        email: 'lmickan9@sun.com',
        password: '',
      };
      const response = await request(app).post('/super-admins/').send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "password" is not allowed to be empty');
    });
  });
});
