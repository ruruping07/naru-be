import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const { printf } = format;
const infoFormat = format.printf(
  ({ level, message, label, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} ${label} <${level}> ${message} ${stack}`;
    } else {
      return `${timestamp} ${label} <${level}> ${message}`;
    }
  },
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.label({ label: 'Console' }),
            format.colorize({all: true}),
            format.splat(),
            format.json(),
            format.simple(),
            format.prettyPrint(),
            infoFormat,
          ),
        }),
        new winstonDaily({
          level: 'error',
          dirname: 'logs',
          filename: `%DATE%_error-logs.log`,
          maxFiles: 5, // 5일치 로그 파일 저장
          zippedArchive: true,
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.label({ label: 'ErrorText' }),
            format.splat(),
            format.json(),
            format.simple(),
            format.prettyPrint(),
            infoFormat,
          ),
        }),
        new winstonDaily({
          level: 'info',
          dirname: 'logs',
          filename: `%DATE%_info-logs.log`,
          maxFiles: 5,
          zippedArchive: true,
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.label({ label: 'InfoText' }),
            format.splat(),
            format.json(),
            format.simple(),
            format.prettyPrint(),
            infoFormat,
          ),
        }),
      ],
      exceptionHandlers: [
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.label({ label: 'Exception Info' }),
            format.colorize({all: true}),
            format.splat(),
            format.json(),
            format.simple(),
            format.prettyPrint(),
            infoFormat,
          ),
        }),
        new winstonDaily({
          dirname: 'logs',
          filename: `%DATE%_exception-error-logs.log`,
          level: 'error',
          maxFiles: 30, // 30일치 로그 파일 저장
          zippedArchive: true,
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.label({ label: 'Exception Error' }),
            format.splat(),
            format.json(),
            format.simple(),
            format.prettyPrint(),
            infoFormat,
          ),
        }),
      ],
    }),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
