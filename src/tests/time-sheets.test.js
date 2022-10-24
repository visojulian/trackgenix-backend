import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheets from '../models/Time-sheets';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import Tasks from '../models/Tasks';
import timeSheetsSeed from '../seeds/time-sheets';
import employeesSeed from '../seeds/employees';
import projectsSeed from '../seeds/projects';
import tasksSeed from '../seeds/tasks';

describe('Time-sheet - Unit tests', () => {
  beforeAll(async () => {
    await TimeSheets.collection.insertMany(timeSheetsSeed);
    await Employees.collection.insertMany(employeesSeed);
    await Projects.collection.insertMany(projectsSeed);
    await Tasks.collection.insertMany(tasksSeed);
  });

  describe('GET /time-sheets', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/time-sheets').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheets found');
    });
  });

  describe('GET BY ID /:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).get('/time-sheets/63535ae7fc13ae517a000031').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheet found');
    });
  });

  describe('GET BY ID ERROR /:id', () => {
    test('should return status code 400', async () => {
      const response = await request(app).get('/time-sheets/634adaf83e995e6b4c7864z1').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('POST /time-sheets', () => {
    const timeSheetMocked = {
      description: 'we are feature',
      date: '2022-10-23',
      hours: 20,
      task: mongoose.Types.ObjectId('63548d04e3c0095bad9f0411'),
      employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
      project: mongoose.Types.ObjectId('6354c31fa0f546fd19325575'),
    };
    test('should return status code 201', async () => {
      const response = await request(app).post('/time-sheets').send(timeSheetMocked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheet created successfully');
    });
  });

  describe('POST ERROR /time-sheets', () => {
    const timeSheetMockedEmpty = {
      description: '',
      date: '',
      hours: '',
      task: '',
      employee: '',
      project: '',
    };
    test('should return status code 400', async () => {
      const response = await request(app).post('/time-sheets').send(timeSheetMockedEmpty);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('DELETE /:id', () => {
    test('should return status code 200', async () => {
      const response = await request(app).delete('/time-sheets/634adbce3e995e6b4c7864ab').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('DELETE ERROR /:id', () => {
    test('should return status code 400', async () => {
      const response = await request(app).delete('/time-sheets/634adaf83e995e6b4c7864z1').send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('PUT /time-sheets', () => {
    const timeSheetMockedEdit = {
      description: 'we are feature',
      date: '2022-10-01',
      hours: 10,
      task: mongoose.Types.ObjectId('634adaf83e995e6b4c7864a7'),
      employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
      project: mongoose.Types.ObjectId('6354c31fa0f546fd19325575'),
    };
    test('should return status code 200', async () => {
      const response = await request(app).put('/time-sheets/63535ae7fc13ae517a000035').send(timeSheetMockedEdit);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('PUT 404 /time-sheets', () => {
    const timeSheetMockedEdit = {
      description: 'we are feature',
      date: '2022-10-01',
      hours: 10,
      task: mongoose.Types.ObjectId('634adaf83e995e6b4c7864a7'),
      employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
      project: mongoose.Types.ObjectId('6354c31fa0f546fd19325575'),
    };
    test('should return status code 404', async () => {
      const response = await request(app).put('/time-sheets/63535ae7fc13ae517a000000').send(timeSheetMockedEdit);
      expect(response.status).toBe(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });

  describe('PUT 400 /time-sheets', () => {
    const timeSheetEditEmpty = {
      description: '',
      date: '',
      hours: '',
      task: '',
      employee: '',
      project: '',
    };
    test('should return status code 400', async () => {
      const response = await request(app).put('/time-sheets/63535ae7fc13ae517a000035').send(timeSheetEditEmpty);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`${response.body.message}`);
    });
  });
});
