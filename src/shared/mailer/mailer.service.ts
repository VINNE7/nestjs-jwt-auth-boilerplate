import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_AUTH_USER'),
        pass: this.configService.get<string>('EMAIL_AUTH_PASSWORD'),
      },
      debug: this.configService.get<boolean>('EMAIL_DEBUG'),
      logger: false,
    });

    const options = {
      viewEngine: {
        extname: '.hbs', // handlebars extension
        layoutsDir:
          process.cwd() +
          `${this.configService.get<string>('EMAIL_LAYOUT_DIR')}`, // location of handlebars templates
        defaultLayout: `${this.configService.get<string>(
          'EMAIL_DEFAULT_LAYOUT',
        )}`, // name of main template
        partialsDir:
          process.cwd() +
          `${this.configService.get<string>('EMAIL_PARTIAL_DIR')}`, // location of your subtemplates aka. header, footer etc
      },
      viewPath:
        process.cwd() + `${this.configService.get<string>('EMAIL_VIEW_PATH')}`,
      extName: '.hbs',
    };
    this.nodemailerTransport.use('compile', hbs(options));
  }
  sendMail(options: any) {
    return this.nodemailerTransport.sendMail(options);
  }
}
