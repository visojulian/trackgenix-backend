import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeeds from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeeds);
});

describe('GET - Get admins', () => {
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

  test('Should return status 404 when the id is invalid', async () => {
    const response = await request(app).get('/admins/634b30cda84415df76492ecf').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('PUT - Edit admins', () => {
  test('Should return an error when the name is empty', async () => {
    const invalidAdmin = {
      name: '',
      lastName: 'notreal',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Name cannot be empty');
  });

  test('Should return an error when the name is less than 3 characters', async () => {
    const invalidAdmin = {
      name: 'ab',
      lastName: 'notreal',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Name must have at least 3 characters');
  });

  test('Should return an error when the name has more than 20 characters', async () => {
    const invalidAdmin = {
      name: 'aaaabbbbccccddddeeeeffff',
      lastName: 'notreal',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Name cannot exceed 20 characters');
  });

  test('Should return an error when the name has special characters', async () => {
    const invalidAdmin = {
      name: 'ab@ab ab',
      lastName: 'notreal',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Name cannot not have special characters');
  });

  test('Should return an error when the name has numbers.', async () => {
    const invalidAdmin = {
      name: 'abc123',
      lastName: 'notreal',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };
    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Name can only have letters');
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
    expect(response.body.message).toBe('There was an error: Last Name cannot be empty');
  });

  test('Should return an error when the last name is less than 3 characters', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'ab',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Last Name must have at least 3 characters');
  });

  test('Should return an error when the last name has more than 25 characters', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'aaaaabbbbbcccccdddddeeeeefffff',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Last Name cannot exceed 25 characters');
  });

  test('Should return an error when the last name has special characters', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'abc@ab abc',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Last Name cannot not have special characters');
  });

  test('Should return an error when the last name has numbers.', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'abcd1234',
      email: 'asd@hotm.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b30cda844d15df73652exd').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Last Name can only have letters');
  });

  test('Should return an error when the email is empty', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'notreal',
      email: '',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Email cannot be empty');
  });

  test('Should return an error when the email has an invalid format', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'notreal',
      email: 'abcd.com.com',
      password: '23132aaaaa',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Email needs to be a valid email address');
  });

  test('Should return an error when the password is empty', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'notreal',
      email: 'idontexist@hot.com',
      password: '',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Password cannot be empty');
  });

  test('Should return an error when the password is less than 8 characters', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'notreal',
      email: 'idontexist@hot.com',
      password: 'abcd',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Password must have at least 8 characters');
  });

  test('Should return an error when the password has special characters', async () => {
    const invalidAdmin = {
      name: 'asdasd',
      lastName: 'notreal',
      email: 'idontexist@hot.com',
      password: 'abc# abcd',
    };

    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97458').send(invalidAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: Password cannot contain special characters');
  });

  test('Should return an error when the id is invalid', async () => {
    const correctAdmin = {
      name: 'valen',
      lastName: 'notreal',
      email: 'idontexist@hot.com',
      password: 'password',
    };
    const response = await request(app).put('/admins/634b31caa18bcb2e7eb97457').send(correctAdmin);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });

  test('should return status code 200', async () => {
    const correctAdmin = {
      name: 'valen',
      lastName: 'notreal',
      email: 'idontexist@hot.com',
      password: 'password',
    };
    const response = await request(app).put('/admins/634b30cda84415df73652ecf').send(correctAdmin);
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('Admin with id: 634b30cda84415df73652ecf edited');
  });
});

describe('POST - Create admin', () => {
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

describe('DELETE - Remove admins', () => {
  test('should return status 404 when the id is invalid', async () => {
    const response = await request(app).delete('/admins/634b30cda84415df73472ecf').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });

  test('should return status 204', async () => {
    const response = await request(app).delete('/admins/634b30cda84415df73652ecf').send();
    expect(response.status).toBe(204);
  });
});
