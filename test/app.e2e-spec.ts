import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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
});
