import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('POST /api/tasks (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('crea una tarea correctamente y retorna 201', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Tarea de prueba', assignee: 'Juan Pérez' })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('Tarea de prueba');
        expect(res.body.assignee).toBe('Juan Pérez');
        expect(res.body.status).toBe('TODO');
        expect(res.body.createdAt).toBeDefined();
      });
  });

  it('retorna 400 cuando falta title', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ assignee: 'Juan Pérez' })
      .expect(400);
  });

  it('retorna 400 cuando falta assignee', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Sin asignado' })
      .expect(400);
  });

  it('retorna 400 cuando title supera 120 caracteres', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'a'.repeat(121), assignee: 'Test' })
      .expect(400);
  });
});
