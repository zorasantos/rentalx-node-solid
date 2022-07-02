import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

let connection: Connection;
let userToken: string;
describe('List Categories Controller', () => {
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

  test('should be able to list categories', async () => {
    await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test'
      })
      .set({
        Authorization: `Bearer ${userToken}`
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
  });
});
