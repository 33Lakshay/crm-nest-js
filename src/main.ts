// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();



import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strips unknown fields
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,

      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const firstMessage = Object.values(firstError.constraints)[0];
        return new BadRequestException(firstMessage);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
