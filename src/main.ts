import * as helmet from 'helmet';
import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    autoFlushLogs: true,
  });
  setupApp(app);

  await app.listen(3000);
}

function setupApp(app: INestApplication): void {
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  SwaggerModule.setup('swagger', app, composeSwaggerDocument(app));
}

function composeSwaggerDocument(app: INestApplication): OpenAPIObject {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Service api')
    .setDescription('Service API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header' })
    .build();

  return SwaggerModule.createDocument(app, swaggerOptions);
}

bootstrap();
