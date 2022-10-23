import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import TasksSeed from '../seeds/tasks';

describe('Tasks - Unit tests', () => {
  beforeAll(async () => {
    await Tasks.collection.insertMany(TasksSeed);
  });

  describe('GET /tasks', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/tasks').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe('Task found');
    });
  });

  describe('GET BY ID /:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/tasks/63548d1929a3478b830780cb').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe('Task found');
    });
  });

  describe('POST /tasks', () => {
    const mockTask = {
      description: 'Hello world',
    };
    test('should return status code 201', async () => {
      const response = await request(app).post('/tasks').send(mockTask);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe('Task create successfully');
    });
  });
});
