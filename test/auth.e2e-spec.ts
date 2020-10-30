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

  it('Login and access private route', () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.lastName(),
      password: faker.internet.password(),
    };
    return waterfall([
      cb =>
        request(app.getHttpServer())
          .post('/auth/register')
          .send(user)
          .expect(201, cb),
      (results, cb) =>
        request(app.getHttpServer())
          .get('/profile')
          .expect(401, cb),
      (results, cb) =>
        request(app.getHttpServer())
          .post('/auth/login')
          .send(user)
          .expect(201, cb),
      (results, cb) =>
        request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${results.body.access_token}`)
          .expect(200, cb),
      (results, cb) => {
        const { body } = results;
        expect(body.username).toBe(user.name);
        cb(null, results);
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
