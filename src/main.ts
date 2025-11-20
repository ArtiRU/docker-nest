import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 5000;

  const config = new DocumentBuilder()
    .setTitle('Docker App')
    .setDescription('Backend for learning docker')
    .setVersion('1.0')
    .addTag('Docker')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  console.log(`App starting on ${PORT}`);
  app.enableCors({
    origin: [/https?:\/\/localhost(:\d+)?$/, 'http://45.147.201.160'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  await app.listen(PORT);
}

bootstrap();
