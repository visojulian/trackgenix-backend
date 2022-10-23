import request from 'supertest';
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
});
