import { Injectable, Logger } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailerService } from '../../shared/mailer/mailer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    this.sendMailChangePassword(changePasswordDto);

    return await this.userService.updateByPassword(
      changePasswordDto.email,
      changePasswordDto.password,
    );
  }

  private sendMailChangePassword(user: ChangePasswordDto | any): void {
    try {
      this.mailerService.sendMail({
        to: user.email,
        from: 'from@example.com',
        subject: 'Change Password successful ✔',
        text: 'Change Password successful!',
        template: 'index',
        context: {
          title: 'Change Password successful!',
          description:
            'Change Password Successfully! ✔, This is your new password: ' +
            user.password,
          nameUser: user.name,
        },
      });
      Logger.log('[MailService] Change Password: Send Mail successfully!');
    } catch (err) {
      Logger.error('[MailService] Change Password: Send Mail Failed!', err);
    }
  }
}
