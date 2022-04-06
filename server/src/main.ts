import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: '*',
      exposedHeaders: '*',
    },
  });
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
