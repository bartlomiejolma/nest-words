import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { waterfall } from 'async';
import * as faker from 'faker';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = {
    email: faker.internet.email(),
    name: faker.name.lastName(),
    password: faker.internet.password(),
  };

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201);
  });
  it('Login and access private route', () => {
    return waterfall([
      cb =>
        request(app.getHttpServer())
          .post('/auth/login')
          .send(user)
          .expect(201, cb),
      (results, cb) =>
        request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${results.body.access_token}`)
          .expect(200, cb),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });
});