import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { Request, Response, NextFunction } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

let isInitialized = false;
let initPromise: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false,
  });

  const config = new DocumentBuilder()
    .setTitle('PlusUrEvents Backend')
    .setDescription('API Documentation for PlusUrEvents application')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.NODE_ENV === 'local' ? 9000 : Number(process.env.PORT);
    await app.listen(port);
    // console.log(`🚀 Server running on port ${port}`);
  }

  isInitialized = true;
}

// Lazy initialization handler for Vercel serverless
const handler = async (req: Request, res: Response, next: NextFunction) => {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = bootstrap().catch((err) => {
        console.error('Bootstrap failed:', err);
        initPromise = null; // allow retry on next request
        throw err;
      });
    }
    await initPromise;
  }
  server(req, res, next);
};

// Local dev: run immediately
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

export default handler;