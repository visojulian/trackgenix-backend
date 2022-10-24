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
    expect(response.body.data).toBeTruthy();
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

describe('ERRORS PUT - invalid edits', () => {
  test('Should return "name empty" ', async () => {
    const fakeAdmin = {
      name: '',
      lastName: 'not real',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(fakeAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
  });

  test('Should return "lastName empty" ', async () => {
    const fakeAdmin = {
      name: 'asdasd',
      lastName: '',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(fakeAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "lastName" is not allowed to be empty');
  });

  test('Should return "email empty" ', async () => {
    const fakeAdmin = {
      name: 'asdasd',
      lastName: 'not real',
      email: '',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(fakeAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "email" is not allowed to be empty');
  });

  test('Should return "password empty" ', async () => {
    const fakeAdmin = {
      name: 'asdasd',
      lastName: 'not real',
      email: 'idontexist@hot.com',
      password: '',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(fakeAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "password" is not allowed to be empty');
  });

  test('Should return "cast to objectId failed" ', async () => {
    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send();
    expect(response.status).toBe(400);
  });
});
