import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from "express";
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1', {
    exclude:['/']
  });

  //enable cors
  app.enableCors({
    origin: "*",
    methods: ['GET','POST','PUT','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false,
  });

  //setup swagger
  const config = new DocumentBuilder().setTitle('PlusUrEvents Backend').setDescription('API Documentation for PlusUrEvents application').setVersion('1.0').addCookieAuth('access_token').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.NODE_ENV === 'local' ? 9000 : Number(process.env.PORT));
  }
}
bootstrap();

export default server;
