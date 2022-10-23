import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectSeed from '../seeds/projects';

describe('Project - Unit tests', () => {
  beforeAll(async () => {
    await Projects.collection.insertMany(projectSeed);
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

  describe('DELETE /:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325575').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('DELETE ERROR /:id', () => {
    test('should return status code 404', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325570').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });
});
