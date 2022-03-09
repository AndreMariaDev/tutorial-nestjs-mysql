import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Basic API')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('api')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.NODE_DOCKER_PORT || 8080;
  await app.listen(PORT);
}
bootstrap();
