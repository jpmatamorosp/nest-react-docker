import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../../shared/guards/auth/jwt-auth.guard';
import { GetUser } from '../../shared/decorators/get.user.decorator';
import { User } from '../user/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { Photo } from '../photo/entities/photo.entity';

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Task record created.', type: Todo })
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User
  ) : Promise<Todo> {
    return await this.todoService.create(createTodoDto, user);
  }

  @Get()
  async findAll(
    @GetUser() user: User
  ) {
    return await this.todoService.findAll(user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return await this.todoService.findOne(+id, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    return await this.todoService.update(+id, user, updateTodoDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return await this.todoService.remove(+id, user);
  }
}
