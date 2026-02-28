import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs';

async function exportSwagger() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('PlusUrEvents Backend').setDescription('API Documentation for PlusUrEvents application').setVersion('1.0').addCookieAuth('access_token').build();


    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
    console.log('Swagger JSON exported successfully');
    await app.close();
}

exportSwagger();