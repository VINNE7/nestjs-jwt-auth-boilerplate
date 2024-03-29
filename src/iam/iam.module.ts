import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsModule } from '../shared/utils/utils.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    UsersModule,
    ForgotPasswordModule,
    ChangePasswordModule,
    UtilsModule,
  ],
  providers: [JwtService],
})
export class IamModule {}
