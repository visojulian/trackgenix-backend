// describe('example', () => {
//   it('Test', () => {
//     expect(true).toEqual(true);
//   });
// });

import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import TasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(TasksSeed);
});

describe('GET /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.status).toBe(200);
  });

  test('Should return error false', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.body.error).toBe(false);
  });

  test('Should return more than one task', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
