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

  describe('GET BY ID /employees/:id', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).get('/employees/634d5803354e41cd60b9e400').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employee found');
    });
  });

  describe('GET BY ID ERROR /employees/:id', () => {
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

  describe('DELETE /employees/:id', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).delete('/employees/634d5803354e41cd60b9e401').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employee with id: 634d5803354e41cd60b9e401 deleted');
    });
  });

  describe('DELETE ERROR /employees/:id', () => {
    test('Should return status code 404', async () => {
      const response = await request(app).delete('/employees/634d5803354e41cd60b9e420').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Employee id: 634d5803354e41cd60b9e420 does not exists');
    });
  });

  describe('PUT /employees/:id', () => {
    test('Should return status code 200', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e405').send(employeeMocked);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Employee id: 634d5803354e41cd60b9e405 edited');
    });
  });

  describe('PUT ERROR ID /employees/:id', () => {
    test('Should return status code 404', async () => {
      const employeeMocked = {
        name: 'Daniel',
        lastName: 'Vinzia',
        phone: '9512613292',
        email: 'danielvinzia@gmail.com',
        password: '591gasDwIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e450').send(employeeMocked);
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Employee id: 634d5803354e41cd60b9e450 does not exists');
    });
  });

  describe('PUT ERROR Name Required /employees/:id', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: '',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "name" is not allowed to be empty ');
    });
  });

  describe('PUT ERROR Last Name Required /employees/:id', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: '',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "lastName" is not allowed to be empty ');
    });
  });

  describe('PUT ERROR Phone Required /employees/:id', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "phone" is not allowed to be empty ');
    });
  });

  describe('PUT ERROR Email Required /employees/:id', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: '',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "email" is not allowed to be empty ');
    });
  });

  describe('PUT ERROR Password Required /employees/:id', () => {
    test('Should return status code 400', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Something went wrong: "password" is not allowed to be empty ');
    });
  });
});
