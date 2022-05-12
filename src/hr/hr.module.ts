import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Logger, UserResolver, UserService],
  exports: [UserService],
})
export class HrModule {}
