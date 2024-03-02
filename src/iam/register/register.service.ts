import { Injectable, Logger } from '@nestjs/common';
import { HashingService } from 'src/shared/hashing.service';
import { MailerService } from 'src/shared/mailer/mailer.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly hashingService: HashingService,
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto.password = await this.hashingService.hash(
      registerUserDto.password,
    );

    this.sendMailRegisterUser(registerUserDto);

    return this.usersService.create(registerUserDto);
  }

  private sendMailRegisterUser(user: RegisterUserDto): void {
    try {
      this.mailerService.sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Registration successful ✔',
        text: 'Registration successful!',
        template: 'index',
        context: {
          title: 'Registration successfully',
          description:
            "You did it! You registered!, You're successfully registered.✔",
          nameUser: user.name,
        },
      });
      Logger.log('[MailService] User Registration: Send Mail successfully!');
    } catch (err) {
      Logger.error('[MailService] User Registration: Send Mail failed!', err);
    }
  }
}
