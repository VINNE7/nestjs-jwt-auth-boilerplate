import { Module } from '@nestjs/common';
import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from '../login/guards/authentication/authentication.guard';
import { AccessTokenGuard } from '../login/guards/access-token/access-token.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../login/config/jwt.config';
import { MailerModule } from 'src/shared/mailer/mailer.module';
import { HashingService } from 'src/shared/hashing.service';
import { BcryptService } from 'src/shared/bcrypt.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    MailerModule,
  ],
  controllers: [ChangePasswordController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    ChangePasswordService,
    UsersService,
    JwtService,
  ],
})
export class ChangePasswordModule {}
