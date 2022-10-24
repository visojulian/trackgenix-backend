import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeeds from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeeds);
});

describe('GET ALL /admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Admins found');
  });
});

describe('GET - Filter by ID', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/admins/634b30cda84415df73652ecf').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    // pq esto es undefined?
    console.log(response.body.data);
    console.log(response.body.data.length);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Admin found');
  });
});

describe('ERROR GET - Filter by ID', () => {
  test('should return status 400', async () => {
    const response = await request(app).get('/admins/634b30cda84415df76492ecf').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});
