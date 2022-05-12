import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './entities/uploadFile.entitiy';
import { Actor } from './xMov/entities/actor.entitiy';
import { MappMovActor } from './xMov/entities/mappMovActor.entity';
import { MovFile } from './xMov/entities/movFile.entity';
import { XMovResolver } from './xMov/xMov.resolver';
import { FilesResolver } from './files.resolver';
import { XMovService } from './xMov/xMov.service';
import { FilesService } from './files.service';
import { User } from 'src/hr/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UploadFile,
      Actor,
      MovFile,
      MappMovActor,
    ]),
  ],
  providers: [Logger, FilesResolver, FilesService, XMovResolver, XMovService],
  exports: [FilesService, XMovService],
})
export class FilesModule {}
