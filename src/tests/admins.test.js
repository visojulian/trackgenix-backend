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

const fakeAdmin = {
  name: 'balen',
  lastName: 'not real',
  email: 'idontexist@hotmail.com',
  password: 'password',
};

describe('ERRORS PUT - invalid edits', () => {
  test('Should return "inputfield is required" ', async () => {
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(fakeAdmin);
    expect(response.status).toBe(400);
    console.log(response.body.message);
    // como hacer un expect "mensaje de error" pero q sea dinamico? quiero asegurarme q siempre sea "x input is not allowed to be empty"
  });

  test('Should return "cast to objectId failed" ', async () => {
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send();
    expect(response.status).toBe(400);
  });
});
