import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { waterfall } from 'async';
import * as faker from 'faker';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/words (GET)', () => {
    return request(app.getHttpServer())
      .get('/words')
      .expect(200);
  });

  it('/words (POST)', () => {
    return request(app.getHttpServer())
      .post('/words')
      .send({ name: 'test' })
      .expect(201);
  });

  it('/words (POST) with verify', () => {
    const newWord = { name: faker.random.word() };
    return waterfall([
      cb =>
        request(app.getHttpServer())
          .post('/words')
          .send(newWord)
          .expect(201, cb),
      (results, cb) =>
        request(app.getHttpServer())
          .get('/words')
          .expect(200, cb),
      (results, cb) => {
        const { body } = results;
        expect(body.length).toBeGreaterThan(0);
        body.sort((firstWord, secondWord) => firstWord.id - secondWord.id);
        expect(body[body.length - 1]).toEqual(expect.objectContaining(newWord));
        cb(null, results);
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
