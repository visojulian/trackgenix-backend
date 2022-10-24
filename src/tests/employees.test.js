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
      const response = await request(app).get('/employees/634d5803354e41cd60b9e555').send();
      expect(response.status).toBe(404);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('This employee id: 634d5803354e41cd60b9e555 does not exists');
    });
  });

  describe('POST /employees', () => {
    test('Should return status code 201', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employee created successfully');
    });
  });

  describe('POST ERROR Name Required /employees', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: '',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "name" is not allowed to be empty ');
    });
  });

  describe('POST ERROR Last Name Required /employees', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: '',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "lastName" is not allowed to be empty ');
    });
  });

  describe('POST ERROR Phone Required /employees', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "phone" is not allowed to be empty ');
    });
  });

  describe('POST ERROR Email Required /employees', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: '',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "email" is not allowed to be empty ');
    });
  });

  describe('POST ERROR Password Required /employees', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '',
      };
      const response = await request(app).post('/employees').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "password" is not allowed to be empty ');
    });
  });
});
