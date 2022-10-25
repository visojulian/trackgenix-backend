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
    test('should return status code 200 if time sheets are found', async () => {
      const response = await request(app).get('/time-sheets').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheets found');
    });
  });

  describe('GET BY ID /time-sheets/:id', () => {
    test('should return status code 200 if the time sheet _id supplied is found', async () => {
      const existId = '63535ae7fc13ae517a000031';
      const response = await request(app).get(`/time-sheets/${existId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheet found');
    });

    test('should return status code 400 when the time sheet _id supplied is invalid', async () => {
      const invalidObjectId = 'thisidisinvalid';
      const response = await request(app).get(`/time-sheets/${invalidObjectId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('An error ocurred:');
    });

    test('should return status code 404 when the time sheet _id supplied does not exist in the database', async () => {
      const validObjectId = '63548d04e3c0095bad9f0412';
      const response = await request(app).get(`/time-sheets/${validObjectId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`There are no timesheet with id: ${validObjectId}`);
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

    test('should return status code 201 if time sheet is created', async () => {
      const response = await request(app).post('/time-sheets').send(timeSheetMocked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Time sheet created successfully');
    });

    test('should return status code 400 if any field does not pass validations', async () => {
      const timeSheetMockedEmpty = {
        description: '',
        date: '',
        hours: '',
        task: '',
        employee: '',
        project: '',
      };
      const response = await request(app).post('/time-sheets').send(timeSheetMockedEmpty);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('Validation has an error, please check:');
    });
  });

  describe('DELETE /time-sheets/:id', () => {
    test('should return status code 200 if time sheet _id is deleted', async () => {
      const existId = '634adbce3e995e6b4c7864ab';
      const response = await request(app).delete(`/time-sheets/${existId}`).send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`Time sheet with id ${existId} has been deleted`);
    });

    test('should return status code 400 when the time sheet _id supplied is invalid', async () => {
      const invalidObjectId = 'thisisaninvalidObjectId';
      const response = await request(app).delete(`/time-sheets/${invalidObjectId}`).send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('An error ocurred:');
    });

    test('should return status code 404 when the time sheet _id supplied does not exist in the database', async () => {
      const validObjectId = '63548d04e3c0095bad9f0412';
      const response = await request(app).delete(`/time-sheets/${validObjectId}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`There are no timesheet with id: ${validObjectId}`);
    });
  });

  describe('PUT /time-sheets/:id', () => {
    test('should return status code 200 when a time sheet is edited', async () => {
      const timeSheetMockedEdit = {
        description: 'we are feature',
        date: '2022-10-01',
        hours: 10,
        task: mongoose.Types.ObjectId('634adaf83e995e6b4c7864a7'),
        employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
        project: mongoose.Types.ObjectId('6354c31fa0f546fd19325575'),
      };
      const existId = '63535ae7fc13ae517a000035';
      const response = await request(app).put(`/time-sheets/${existId}`).send(timeSheetMockedEdit);
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe(`Time sheet with id ${existId} has been updated`);
    });

    test('should return status code 400 if any field does not pass validations', async () => {
      const timeSheetEditEmpty = {
        description: '',
        date: '',
        hours: '',
        task: '',
        employee: '',
        project: '',
      };
      const existId = '63535ae7fc13ae517a000035';
      const response = await request(app).put(`/time-sheets/${existId}`).send(timeSheetEditEmpty);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('Validation has an error, please check:');
    });

    test('should return status code 404 when the time sheet _id supplied is invalid', async () => {
      const timeSheetMockedEdit = {
        description: 'we are feature',
        date: '2022-10-01',
        hours: 10,
        task: mongoose.Types.ObjectId('634adaf83e995e6b4c7864a7'),
        employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
        project: mongoose.Types.ObjectId('6354c31fa0f546fd19325575'),
      };
      const invalidObjectId = '63535ae7fc13ae517a000000';
      const response = await request(app).put(`/time-sheets/${invalidObjectId}`).send(timeSheetMockedEdit);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe(`There are no timesheet with id: ${invalidObjectId}`);
    });
  });
});
