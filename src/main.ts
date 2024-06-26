import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all.exception';
import { CustomValidationPipe } from './pipe/custom-validation.pipe';
import { CookiesDescr } from './utils/consts/CookiesDescr';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 8090;

  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('Product Manager API')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('Nets.js PostgresSQL TypeORM')
    .addCookieAuth(CookiesDescr.KEY, { type: 'http', in: 'cookie' })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEADER', 'PATCH', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter({ httpAdapter }));
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen(PORT, () => logger.log(`Server started on port ${PORT}`));
}
bootstrap();
