import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { User } from './hr/user/entities/user.entity';
import { UploadFile } from './files/entities/uploadFile.entitiy';
import { Actor } from './files/xMov/entities/actor.entitiy';
import { MovFile } from './files/xMov/entities/movFile.entity';
import { MappMovActor } from './files/xMov/entities/mappMovActor.entity';
import { JwtModule } from './jwt/jwt.module';
import { FilesModule } from './files/files.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required().required(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';

        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        };
      },
      formatError: (error) => {
        console.error('error', error);
        return error;
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities: [
        User,
        UploadFile,
        Actor,
        MovFile,
        MappMovActor]
      ,
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    CommonModule,
    AuthModule,
    HrModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
