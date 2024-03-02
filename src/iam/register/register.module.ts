import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/shared/bcrypt.service';
import { HashingService } from 'src/shared/hashing.service';
import { MailerModule } from 'src/shared/mailer/mailer.module';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailerModule],
  controllers: [RegisterController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    RegisterService,
    UsersService,
  ],
})
export class RegisterModule {}
