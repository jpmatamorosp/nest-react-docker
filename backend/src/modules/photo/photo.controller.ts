import { Query, Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Res, UseInterceptors, ClassSerializerInterceptor, UsePipes, BadRequestException, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';
import { PaginatedDto } from './../../shared/dtos/paginated.dto';
import { ApiPaginatedResponse } from '../../shared/decorators/paginated.response.decorator';
import { JWTAuthGuard } from '../../shared/guards/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Photo')
@Controller('photo')
@UseGuards(JWTAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Post()
  @ApiOperation({ summary: 'Create photo' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Photo record created.', type: Photo })
  async create(@Res() res: Response, @Body() createUserDto: CreatePhotoDto) {
    const photo: Photo = await this.photoService.create(createUserDto);
    return res.status(HttpStatus.CREATED).send(photo);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Get photos list.' })
  @ApiPaginatedResponse(Photo)
  async findAll(
    @Query('page') page: number = 1,
    @Query('take') take: number = 10,
    @Query('keyword') keyword?: string
  ): Promise<PaginatedDto<Photo>> {
    return await this.photoService.findAll(page, take, keyword);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get photo by id.' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Photo,
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async findOne(@Param('id') id: string): Promise<Photo> {
    return await this.photoService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update photo.' })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdatePhotoDto) {
    return await this.photoService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Record not found.', })
  @ApiOperation({ summary: 'Delete photo.' })
  async remove(@Param('id') id: string) {
    return await this.photoService.remove(+id);
  }
}
