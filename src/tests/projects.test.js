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
    test('should return status code 200', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('All Projects');
    });
  });

  describe('GET BY ID /projects/:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/projects/6354c3046634d3f5d058bae8').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });

    test('should return status code 400', async () => {
      const response = await request(app).get('/projects/6354c2ee2c85bbe8fb51072').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('POST /projects', () => {
    test('should create a project and return status 201', async () => {
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

    test('should not create a project and return status 400', async () => {
      const projectsMooked = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        clientName: '',
        employees: [{ employee: '' }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });
});
