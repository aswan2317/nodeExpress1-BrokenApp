const request = require('supertest');
const { app, server } = require('../app');
const db = require('../db');

let testUser;

beforeEach(async () => {
  const result = await db.query(`
    INSERT INTO users (name, type)
    VALUES ('TestUser', 'admin')
    RETURNING id, name, type
  `);
  testUser = result.rows[0];
});

afterEach(async () => {
  await db.query('DELETE FROM users');
});

afterAll(async () => {
  await db.end();
  server.close();  // Close the server instance
});

describe('GET /users', () => {
  test('Gets a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      users: [testUser],
    });
  });
});

describe('POST /users', () => {
  test('Creates a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Ezra',
        type: 'staff',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: 'Ezra',
      type: 'staff',
    });
  });
});

describe('PATCH /users/:id', () => {
  test('Updates a user', async () => {
    const response = await request(app)
      .patch(`/users/${testUser.id}`)
      .send({
        name: 'UpdatedUser',
        type: 'admin',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: testUser.id,
      name: 'UpdatedUser',
      type: 'admin',
    });
  });

  test('Responds with 404 if id invalid', async () => {
    const response = await request(app)
      .patch('/users/0')
      .send({
        name: 'UpdatedUser',
        type: 'admin',
      });
    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /users/:id', () => {
  test('Deletes a user', async () => {
    const response = await request(app).delete(`/users/${testUser.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });

  test('Responds with 404 if id invalid', async () => {
    const response = await request(app).delete('/users/0');
    expect(response.statusCode).toBe(404);
  });
});
