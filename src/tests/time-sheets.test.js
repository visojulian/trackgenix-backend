import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheets from '../models/Time-sheets';
import timeSheetsSeed from '../seeds/time-sheets';

describe('Time-sheet - Unit tests', () => {
  beforeAll(async () => {
    await TimeSheets.collection.insertMany(timeSheetsSeed);
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
      const response = await request(app).get('/time-sheets/634adaf83e995e6b4c7864a7').send();
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
      task: mongoose.Types.ObjectId('634adaf83e995e6b4c7864a7'),
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
      const response = await request(app).delete('/time-sheets/634adaf83e995e6b4c7864a7').send();
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
});
