import { Controller, Get, Post, Body, Param, Delete, UseGuards, UsePipes, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
//import { Roles } from '../../core/guards/role/roles.decorator';
//import { Role } from '../../core/guards/role/role.enum';
//import { RolesGuard } from '../../core/guards/role/roles.guard';
//import { JWTAuthGuard } from '../../core/guards/auth/jwt-auth.guard';
//import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
//@UseGuards(RolesGuard)
//@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBadRequestResponse({ description: 'Bad request.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiCreatedResponse({ description: 'User record created.', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const result = await this.userService.create(createUserDto);
    return result;
  }

  @Get()
  //@Roles(Role.Admin)
  @ApiOperation({ summary: 'Get users list' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user record',
    type: User
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({status: 204})
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Record not found.',  })
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
