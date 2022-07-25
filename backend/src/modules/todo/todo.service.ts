import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return await this.todoRepository.create({...createTodoDto, userId: user.id});
  }

  async findAll(user: User): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { userId: user.id} });
  }

  async findOne(id: number, user: User): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id: id, userId: user.id} });
  }

  async update(id: number, user: User, updateTodoDto: UpdateTodoDto): Promise<UpdateResult> {
    return await this.todoRepository.update({id, userId: user.id}, {...updateTodoDto});
  }

  async remove(id: number, user: User): Promise<DeleteResult> {
    return await this.todoRepository.delete({id, userId: user.id});
  }
}
