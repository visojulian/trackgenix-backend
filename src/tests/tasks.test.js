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
      expect(response.body.message).toBe('Tasks found');
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
    test('should return status 404 when the id is invalid', async () => {
      const response = await request(app).delete('/tasks/63548d1929a3478b83078099').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
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
      expect(response.body.message).toBe('Task created');
    });
  });

  describe('DELETE ERROR /tasks/:id', () => {
    test('should return status 200 when task is found and deleted', async () => {
      const response = await request(app).delete('/tasks/63548d0f2e375d491a94b171').send();
      expect(response.status).toBe(204);
    });

    test('should return status 404 when the id is invalid', async () => {
      const response = await request(app).delete('/tasks/63548d1929a3478b83078099').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    });
  });

  describe('PUT /tasks', () => {
    const mockTask = {
      description: 'Hello world',
    };
    test('should return status code 200', async () => {
      const response = await request(app).put('/tasks/63548d1929a3478b830780cb').send(mockTask);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toEqual('Task with id: 63548d1929a3478b830780cb edited');
    });
  });
});
