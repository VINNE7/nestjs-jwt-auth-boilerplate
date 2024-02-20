import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserProfileDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
