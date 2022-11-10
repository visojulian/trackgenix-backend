import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

describe('Projects - Unit tests', () => {
  beforeAll(async () => {
    await Projects.collection.insertMany(projectsSeed);
  });

  describe('GET /projects', () => {
    test('it should return status code 200 when it finds the projects', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Projects found');
    });
  });

  describe('GET BY ID /projects/:id', () => {
    test('should return status code 200 when it finds projects filtered by id', async () => {
      const response = await request(app).get('/projects/6354c3046634d3f5d058bae8').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Project found');
    });

    test('should return status code 500 when filtered id is invalid', async () => {
      const response = await request(app).get('/projects/6354c2ee2c85bbe8fb51072').send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('Cast to ObjectId failed for value "6354c2ee2c85bbe8fb51072" (type string) at path "_id" for model "Projects"');
    });
  });

  describe('POST /projects', () => {
    test('should return status code 201 when a project is created', async () => {
      const projectsMooked = {
        name: 'Project11',
        description: 'Test11',
        startDate: '2022-12-13',
        endDate: '2022-12-18',
        clientName: 'pepita',
        employees: [{
          employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e422'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(201);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toBe('Project created');
    });

    test('should return status code 400 when a project is not created because it did not pass validation in name', async () => {
      const projectsMooked = {
        name: '',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
            mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in description', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: '',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
            mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "description" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in startDate', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{
          employee:
            mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "startDate" must be in ISO 8601 date format');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in endDate', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '',
        clientName: 'jhonDeere',
        employees: [{
          employee:
            mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "endDate" must be in ISO 8601 date format');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in clientName', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: '',
        employees: [{
          employee:
            mongoose.Types.ObjectId('634d5803354e41cd60b9e406'),
          role: 'QA',
          rate: 5.2,
        }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "clientName" is not allowed to be empty');
    });
    test('should return status code 400 when a project is not created because it did not pass validation in employee', async () => {
      const projectsMooked = {
        name: 'jhon',
        description: 'doe',
        startDate: '2022-11-11',
        endDate: '2022-11-18',
        clientName: 'jhonDeere',
        employees: [{ employee: '' }],
      };
      const response = await request(app).post('/projects').send(projectsMooked);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toBe('There was an error: "employees[0].employee" is not allowed to be empty');
    });
  });

  describe('DELETE - deleteProject', () => {
    test('should return an status 200 when the project id is correct and exist in the database', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325575').send();
      expect(response.status).toBe(204);
    });

    test('Should return an status 404 when the project id is correct but does not exist in the database', async () => {
      const response = await request(app).delete('/projects/6354c31fa0f546fd19325570').send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Project not found');
    });

    test('Should return an status 400 when the project id is invalid', async () => {
      const response = await request(app).delete('/projects/6').send();
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Projects"');
    });
  });

  describe('PUT - updateProject', () => {
    const projectMock = {
      name: 'Mateo',
      description: 'Scarabino',
      startDate: '2022-12-11',
      endDate: '2022-12-15',
      clientName: 'pepito',
      employees: [
        {
          employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
          role: 'QA',
          rate: 5.2,
        },
      ],
    };
    test('Sending correct existing id and data should return status code 200', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5100/update').send(projectMock);
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toEqual('Project with id: 6354c31a6c738f0c041f5100 edited');
    });

    test('Sending correct non existing id should return status code 404', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5101/update').send(projectMock);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Project not found');
    });

    test('Should return an status 400 when the project id is invalid', async () => {
      const response = await request(app).put('/projects/6/update').send(projectMock);
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Projects"');
    });

    test('Should return an status 400 when body data is wrong', async () => {
      const projectMockBad = {
        name: 25,
      };
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5100/update').send(projectMockBad);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      // eslint-disable-next-line no-useless-escape
      expect(response.body.message).toEqual('There was an error: \"name\" must be a string');
    });
  });

  describe('PUT - assignEmployee', () => {
    const employeeMock = {
      employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
      role: 'DEV',
      rate: 20,
    };
    test('Sending correct existing id and data should return status code 200', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5100/assignEmployee').send(employeeMock);
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
      expect(response.body.data).toBeDefined();
      expect(response.body.message).toEqual('Employee assigned to project 6354c31a6c738f0c041f5100');
    });

    test('Sending correct non existing id should return status code 404', async () => {
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5101/assignEmployee').send(employeeMock);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual('Project not found');
    });

    test('Should return an status 400 when the project id is invalid', async () => {
      const response = await request(app).put('/projects/6/assignEmployee').send(employeeMock);
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toEqual("Cast to ObjectId failed for value \"{ _id: '6' }\" (type Object) at path \"_id\" for model \"Projects\"");
    });

    test('Should return an status 400 when body data is wrong', async () => {
      const employeeMockBad = {
        employee: mongoose.Types.ObjectId('634d5803354e41cd60b9e400'),
        role: 'DEV',
        rate: 'a lot',
      };
      const response = await request(app).put('/projects/6354c31a6c738f0c041f5100/assignEmployee').send(employeeMockBad);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(true);
      expect(response.body.data).toBeUndefined();
      // eslint-disable-next-line no-useless-escape
      expect(response.body.message).toEqual('There was an error: \"rate\" must be a number');
    });
  });
});
