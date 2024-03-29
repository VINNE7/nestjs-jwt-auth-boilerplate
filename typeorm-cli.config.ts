import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USER'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DB'),
  entities: [],
  migrations: [],
});
