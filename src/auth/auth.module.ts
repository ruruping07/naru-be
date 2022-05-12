import { Module, Logger } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { HrModule } from 'src/hr/hr.module';
@Module({
  imports: [HrModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Logger,
  ],
})
export class AuthModule {}
