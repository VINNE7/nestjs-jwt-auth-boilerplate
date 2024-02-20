import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/shared/hashing.service';
import { UserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(createdUser);
      return createdUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findBySub(sub: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id: sub });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({
      id,
    });

    if (!user) throw new NotFoundException(`user ${id} not found`);

    return user;
  }

  async updatePasswordByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email: email });
      user.password = await this.hashingService.hash(
        Math.random().toString(36).slice(-8),
      );

      return await this.usersRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserProfile(
    id: string,
    userProfileDto: UserProfileDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id: id });

    await this.usersRepository.update({ id: user.id }, userProfileDto);
    return await this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id });

    return await this.usersRepository.remove(user);
  }
}
