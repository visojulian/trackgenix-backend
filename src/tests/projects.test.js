import request from 'supertest';
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
});
