import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.find(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.find(id);
    await this.userRepository.remove(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.find(id);
    if (!user) throw new NotFoundException(`Record not found.`);
    const userUpdated = {...user, ...updateUserDto};
    return await this.userRepository.save(userUpdated);
  }

  async findByUserName(username: string, withPassword: boolean): Promise<User> {
    let options: FindOneOptions<User> = {
      where: {username},
      relations: [ 'role' ]
    };
    if (withPassword) {
        options.select = [ 'email', 'password' ]
    }
    return await this.userRepository.findOne(
      options).then((user) => {
        return user;
    });
  }

  private async find(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) throw new NotFoundException(`Record not found.`);
    return user;
  }
}
