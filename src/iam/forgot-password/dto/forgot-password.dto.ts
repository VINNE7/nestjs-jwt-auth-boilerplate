import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class ForgotPasswordDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
