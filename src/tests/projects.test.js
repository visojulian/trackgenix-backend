import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Projects from '../models/Projects';
import projectSeed from '../seeds/projects';

describe('Project - Unit tests', () => {
  beforeAll(async () => {
    await Projects.collection.insertMany(projectSeed);
  });

  describe('DELETE', () => {
    test('Should return an status 200 when the project id is correct and exist in the database', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325575').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toEqual('Project 6354c31fa0f546fd19325575 deleted');
    });

    test('Should return an status 404 when the project id is correct but does not exist in the database', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325570').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Project 6354c31fa0f546fd19325570 does not exist');
    });

    test('Should return an status 400 when the project id is invalid', async () => {
      const response = await request(app).delete('/projects/6').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Invalid Project Id');
    });
  });

  describe('PUT', () => {
    const projectMock = {
      name: 'Mateo',
      description: 'Scarabino',
      startDate: '2022-12-11',
      endDate: '2022-12-15',
      clientName: 'pepito',
      employees: [{ employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'), role: 'QA', rate: 5.2 }],
    };
    test('Sending correct existing id and data should return status code 200', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5100/update').send(projectMock);
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toEqual('Project 6354c31a6c738f0c041f5100 updated');
    });

    test('Sending correct non existing id should return status code 404', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5101/update').send(projectMock);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Project 6354c31a6c738f0c041f5101 does not exist');
    });

    test('Should return an status 400 when the project id is invalid', async () => {
      const response = await request(app).put('/projects/6/update').send(projectMock);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Invalid Project Id');
    });

    const projectMockBad = {
      name: 25,
    };
    test('Should return an status 400 when body data is wrong', async () => {
      const response = await request(app).put('/projects/6/update').send(projectMockBad);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      // eslint-disable-next-line no-useless-escape
      expect(response.body.message).toEqual('There was an error: \"name\" must be a string');
    });
  });
});
