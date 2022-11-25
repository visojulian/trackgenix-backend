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

    test('should return an status 404 when the employee does not exist in the database', async () => {
      const response = await request(app).get('/employees/634d5803354e41cd60b9e555').send();
      expect(response.status).toBe(404);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Employee not found');
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
      expect(response.body.message).toBe('Employee created');
    });

    test('should return an error 400 when the name is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Name cannot be empty');
    });

    test('should return an error 400 when the lastName is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Last Name cannot be empty');
    });

    test('should return an error 400 when the phone is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Phone cannot be empty');
    });

    test('should return an error 400 when the email is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Email cannot be empty');
    });

    test('should return an error 400 when the password is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Password cannot be empty');
    });
  });

  describe('DELETE /employees/:id', () => {
    test('Should return status code 204', async () => {
      const response = await request(app).delete('/employees/634d5803354e41cd60b9e401').send();
      expect(response.status).toBe(204);
    });

    test('should return an status 404 when the employee does not exist in the database', async () => {
      const response = await request(app).delete('/employees/634d5803354e41cd60b9e420').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Employee not found');
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
      expect(response.body.message).toBe('Employee with id: 634d5803354e41cd60b9e405 edited');
    });

    test('should return an status 404 when the employee does not exist in the database', async () => {
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
      expect(response.body.message).toBe('Employee not found');
    });

    test('should return an error 400 when the name is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Name cannot be empty');
    });

    test('should return an error 400 when the name is less than 3 characters', async () => {
      const employeeMocked = {
        name: 'ab',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Name must have at least 3 characters');
    });

    test('should return an error 400 when the name has more than 20 characters', async () => {
      const employeeMocked = {
        name: 'aaaaabbbbbcccccdddddeeeee',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Name cannot exceed 20 characters');
    });

    test('should return an error 400 when the name has numbers or special characters', async () => {
      const employeeMocked = {
        name: '123 abc @cdf$#',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Name can only have letters');
    });

    test('should return an error 400 when the lastName is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Last Name cannot be empty');
    });

    test('should return an error 400 when the lastName is less than 3 characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'ab',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Last Name must have at least 3 characters');
    });

    test('should return an error 400 when the lastName has more than 25 characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'aaaaabbbbbcccccdddddeeeeefffff',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Last Name cannot exceed 25 characters');
    });

    test('should return an error 400 when the lastName has numbers or special characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: '123#$!@#',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Last Name can only have letters');
    });

    test('should return an error 400 when the phone is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Phone cannot be empty');
    });

    test('should return an error 400 when the phone exceeds 10 numbers', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '12345678901',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Phone cannot exceed 10 numbers');
    });

    test('should return an error 400 when the phone has letters or special characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: 'abc @#!$!@',
        email: 'tomasbettini@gmail.com',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Phone can only have numbers');
    });

    test('should return an error 400 when the email is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Email cannot be empty');
    });

    test('should return an error 400 when the email has an invalid format', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'abc.abc@.com.@abc',
        password: '591gJWFkIlF8',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Email needs to be a valid address');
    });

    test('should return an error 400 when the password is empty', async () => {
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
      expect(response.body.message).toBe('There was an error: Password cannot be empty');
    });
    test('should return an error 400 when the password is less than 8 characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: 'abc123',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Password must have at least 8 characters');
    });
    test('should return an error 400 when the password has special characters', async () => {
      const employeeMocked = {
        name: 'Tomas',
        lastName: 'Bettini',
        phone: '9512613592',
        email: 'tomasbettini@gmail.com',
        password: 'abc123#$%',
      };
      const response = await request(app).put('/employees/634d5803354e41cd60b9e409').send(employeeMocked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: Password cannot contain special characters');
    });
  });
});
