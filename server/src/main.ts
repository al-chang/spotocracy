import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: '*',
      exposedHeaders: '*',
    },
  });
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
