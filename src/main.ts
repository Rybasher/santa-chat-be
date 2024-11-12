import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONT_URL],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Santa chat')
    .setDescription('The santa`s API description')
    .setVersion('1.0')
    .addTag('santa')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
