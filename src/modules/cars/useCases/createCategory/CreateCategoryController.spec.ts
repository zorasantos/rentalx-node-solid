import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

let connection: Connection;
let userToken: string;
describe('Create Category Controller', () => {
  beforeEach(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, avatar, "isAdmin", created_at, driver_license)
      VALUES ('${id}', 'Admin', 'admin@rentx.com.br', '${password}', 'xxxx-xxxx-xxxx', true, NOW(), 'XXXXXX')`
    );

    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { token } = responseToken.body;
    userToken = token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  test('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test'
      })
      .set({
        Authorization: `Bearer ${userToken}`
      });

    expect(response.status).toBe(201);
  });

  // Se rodar esse teste também, gera o erro: AlreadyHasActiveConnectionError:
  // Cannot create a new connection named "default", because connection with
  // such name already exist and it now has an active connection session.
  test.skip('should not be able to create a new category with name exists', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test'
      })
      .set({
        Authorization: `Bearer ${userToken}`
      });

    expect(response.status).toBe(400);
  });
});
