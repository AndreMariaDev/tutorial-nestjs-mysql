import { Injectable ,Inject} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: typeof User,
    //private sequelize: Sequelize
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.isActive = true;
    return await user.save();
  }

  async update(id: number, user: UpdateUserDto): Promise<User | boolean> {
    const obj = await this.userRepository.findOne<User>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }

    obj.firstName = user.firstName;
    obj.lastName = user.lastName;
    obj.isActive = user.isActive;
    return await obj.save();
  }

  async delete(id: number): Promise<User | boolean> {
    const obj = await this.userRepository.findOne<User>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }
    obj.isActive = false;
    return await obj.save();
  }
}