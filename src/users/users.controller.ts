import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProfileDto } from './dto/update-user-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:userId')
  public async findOneUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Put('/:userId/profile')
  public async updateProfileUser(
    @Param('userId') userId: string,
    @Body() userProfileDto: UserProfileDto,
  ): Promise<any> {
    try {
      await this.usersService.updateUserProfile(userId, userProfileDto);

      return {
        message: 'User Updated successfully!',
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: User not updated!');
    }
  }

  @Put('/:userId')
  public async updateUser(
    @Param('userId') userId: string,
    @Body() userUpdateDto: UpdateUserDto,
  ) {
    try {
      await this.usersService.update(userId, userUpdateDto);

      return {
        message: 'User Updated successfully!',
        status: HttpStatus.OK,
      };
    } catch (err) {
      throw new BadRequestException(err, 'Error: User not updated!');
    }
  }

  @Delete('/:userId')
  public async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.usersService.remove(userId);
  }
}
