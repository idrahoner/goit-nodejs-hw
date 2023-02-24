const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../app');
const { UserModel } = require('../models');

const { DB_ACCESS_KEY, PORT } = process.env;

describe('POST /api/users/login', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_ACCESS_KEY);
    server = app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  test('Successful user login. Response: token and user data', async () => {
    const testUser = { email: 'hello@mail.com', password: 'world123' };
    const response = await request(app).post('/api/users/login').send(testUser);
    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body.user).toStrictEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
    expect(body.token).toBeTruthy();
    const { token } = await UserModel.findOne({ email: testUser.email });
    expect(body.token).toBe(token);
  });
});
