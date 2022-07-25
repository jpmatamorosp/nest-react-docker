import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from './../../shared/dtos/paginated.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) { }

  async findAll(page: number, take: number, keyword: string): Promise<PaginatedDto<Photo>> {
    page--;

    if (page > 0) page = page * take;
    
    const [result, total] = await this.photoRepository.findAndCount(
      {
        where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
        take: take,
        skip: page
      }
    );
    
    return {
      limit: take,
      offset: page,
      results: result,
      total: total
    }
  }

  private async find(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: {id}});
    if (!photo) throw new NotFoundException(`Record not found.`);
    return photo;
  }

  async findOne(id: number): Promise<Photo> {
    return await this.find(id);
  }

  async create(createUserDto: CreatePhotoDto): Promise<Photo> {
    const photo: Photo = new Photo();
    photo.name = createUserDto.name;
    photo.description = createUserDto.description;
    photo.filename = createUserDto.filename;
    await this.photoRepository.save(photo);
    return photo;
  }

  async update(id: number, updateUserDto: UpdatePhotoDto): Promise<Photo> {
    let photo = await this.find(id);
    if (!photo) throw new NotFoundException(`Record not found.`);
    photo = { ...photo, ...updateUserDto };
    return await this.photoRepository.save(photo);
  }

  async remove(id: number): Promise<Photo> {
    const photo = await this.find(id);
    return await this.photoRepository.remove(photo);
  }
}