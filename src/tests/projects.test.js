import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Projects from '../models/Projects';
import ProjectsSeed from '../seeds/projects';

describe('Projects - Unit tests', () => {
  beforeAll(async () => {
    await Projects.collection.insertMany(ProjectsSeed);
  });
  describe('GET /projects', () => {
    test('it should return status code 200 when it finds the projects', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('All Projects');
    });
  });
  describe('GET BY ID /projects/:id', () => {
    test('should return status code 200 when it finds projects filtered by id', async () => {
      const response = await request(app).get('/projects/6354c3046634d3f5d058bae8').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Project found');
    });
    test('should return status code 400 when filtered id is invalid', async () => {
      const response = await request(app).get('/projects/6354c2ee2c85bbe8fb51072').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('An error ocurred');
    });
  });
  describe('POST /projects', () => {
    test('should return status code 201 when a project is created', async () => {
      const projectsMooked = {
        name: 'Project11',
        description: 'Test11',
        startDate: '2022-12-13',
        endDate: '2022-12-18',
        clientName: 'pepita',
        employees: [{
          employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e422'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Project created successfully!');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in name', async () => {
      const projectsMooked = {
        name: '',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
          mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in description', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: '',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
          mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "description" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in startDate', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
          mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "startDate" must be in ISO 8601 date format');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in endDate', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '',
        clientName: 'jhonDeere',
        employees: [{
          employee:
          mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "endDate" must be in ISO 8601 date format');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in clientName', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: '',
        employees: [{
          employee:
          mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "clientName" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in employee', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{ employee: '' }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "employees[0].employee" is not allowed to be empty');
    });
  });
});
