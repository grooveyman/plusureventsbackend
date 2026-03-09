import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs';
import express from 'express';
import { ExpressAdapter } from "@nestjs/platform-express";

async function exportSwagger() {
    const server = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
        logger: false
    });

    app.setGlobalPrefix('api/v1', { exclude:['/']});
    

    const config = new DocumentBuilder().setTitle('PlusUrEvents Backend').setDescription('API Documentation for PlusUrEvents application').setVersion('1.0').addCookieAuth('access_token').addServer('https://plusureventsbackend.vercel.app/', 'Production').build();

    await app.init();


    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    console.log('Swagger JSON exported successfully');
    await app.close();
    process.exit(0);
}


exportSwagger().catch((err) => {
    console.error(`Failed to export swagger`, err);
    process.exit(1);
});