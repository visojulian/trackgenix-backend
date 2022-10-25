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

  test('Should return status 400 when the id is invalid', async () => {
    const response = await request(app).get('/admins/634b30cda84415df76492ecf').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('PUT - invalid edits', () => {
  test('Should return an error when the name is empty', async () => {
    const invalidAdmin = {
      name: '',
      lastName: 'not real',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
  });

  test('Should return an error when the last name is empty', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: '',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "lastName" is not allowed to be empty');
  });

  test('Should return an error when the email is empty', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'not real',
      email: '',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "email" is not allowed to be empty');
  });

  test('Should return an error when the password is empty', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'not real',
      email: 'idontexist@hot.com',
      password: '',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "password" is not allowed to be empty');
  });

  test('Should return an error when the id is invalid', async () => {
    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('should return status code 200', async () => {
    const correctAdmin = {
      name: 'valen',
      lastName: 'not real',
      email: 'idontexist@hot.com',
      password: 'password',
    };
    const response = await request(app).put('/admins/634b30cda84415df73652ecf').send(correctAdmin);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Admin was updated');
  });
});

describe('POST - create admin', () => {
  const validAdmin = {
    name: 'balen',
    lastName: 'asaa',
    email: 'dasdasd@hotm.com',
    password: 'aaaaaaaaaaaaaaa',
  };
  test('should return status 201', async () => {
    const response = await request(app).post('/admins').send(validAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Admin created');
  });

  const emptyAdmin = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };
  test('should return status 400', async () => {
    const response = await request(app).post('/admins').send(emptyAdmin);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('DELETE tests', () => {
  test('should return status 400 when the id is invalid', async () => {
    const response = await request(app).delete('/admins/634b30cda84415df73472ecf').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });

  test('should return status 200', async () => {
    const response = await request(app).delete('/admins/634b30cda84415df73652ecf').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
