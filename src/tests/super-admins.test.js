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
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super admins found');
    });
  });

  describe('GET BY ID /super-admins/:id', () => {
    test('should return status code 200', async () => {
      const superAdminId = '63557f5186b431bda635cd0c';
      const response = await request(app).get(`/super-admins/${superAdminId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super admin found');
    });

    test('should return status code 500', async () => {
      const superAdminId = '63557f5186b431bda635ee';
      const response = await request(app).get(`/super-admins/${superAdminId}`).send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Cast to ObjectId failed for value "63557f5186b431bda635ee" (type string) at path "_id" for model "Super-admins"');
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
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super admin created');
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
      expect(response.body.error).toBe(true);
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
      expect(response.body.error).toBe(true);
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
      expect(response.body.error).toBe(true);
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
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "password" is not allowed to be empty');
    });
  });

  describe('DELETE /super-admins/:id', () => {
    test('should return status code 204 if super admin is deleted', async () => {
      const superAdminId = '63557febf3b39e6ffe36f580';
      const response = await request(app).delete(`/super-admins/${superAdminId}`).send();
      expect(response.status).toBe(204);
    });
    test('should return status code 400 when the superadmin _id supplied is invalid', async () => {
      const superAdminId = '6354c3046634d3f5d058ba';
      const response = await request(app).delete(`/super-admins/${superAdminId}`).send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('Cast to ObjectId failed for value "6354c3046634d3f5d058ba" (type string) at path "_id" for model "Super-admins"');
    });
  });

  describe('PUT /super-admins/:id', () => {
    test('should return status code 200 when a super admin is edited', async () => {
      const superAdminId = '63557ff1d2da47ee05366c85';
      const superAdminMooked = {
        name: 'Percy',
        lastName: 'Mickan',
        email: 'lmickan9@sun.com',
        password: 'ChangePassword1',
      };
      const response = await request(app).put(`/super-admins/${superAdminId}`).send(superAdminMooked);
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Super admin with id: 63557ff1d2da47ee05366c85 edited');
    });

    test('should return status code 400 when a super admin is not edited because it did not pass validation in name', async () => {
      const superAdminId = '63557ff1d2da47ee05366c85';
      const superAdminMooked = {
        name: '',
        lastName: 'Mickan',
        email: 'lmickan9@sun.com',
        password: 'ChangePassword1',
      };
      const response = await request(app).put(`/super-admins/${superAdminId}`).send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
    });

    test('should return status code 400 when a super admin is not edited because it did not pass validation in email', async () => {
      const superAdminId = '63557ff1d2da47ee05366c85';
      const superAdminMooked = {
        name: 'Percy',
        lastName: 'Mickan',
        email: '',
        password: 'ChangePassword1',
      };
      const response = await request(app).put(`/super-admins/${superAdminId}`).send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "email" is not allowed to be empty');
    });

    test('should return status code 400 when a super admin is not edited because it did not pass validation in password', async () => {
      const superAdminId = '63557ff1d2da47ee05366c85';
      const superAdminMooked = {
        name: 'Percy',
        lastName: 'Mickan',
        email: 'lmickan9@sun.com',
        password: '',
      };
      const response = await request(app).put(`/super-admins/${superAdminId}`).send(superAdminMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "password" is not allowed to be empty');
    });
  });
});
