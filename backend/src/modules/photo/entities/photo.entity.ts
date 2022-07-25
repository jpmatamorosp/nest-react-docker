import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Photo {
  @ApiProperty({ example: 1, description: 'The photo database id.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Photo name", description: 'The name of the photo.' })
  @Column("varchar", { length: 50 })
  name: string;

  @ApiProperty({ example: "Photo description", description: 'The description of the photo.' })
  @Column('text')
  description: string;

  @ApiProperty({ example: "photo.png", description: 'The file name.' })
  @Column("varchar", { length: 50 })
  filename: string;

  @ApiProperty({ example: 1, description: 'The number of views.' })
  @Column({ type: "int", default: 0 })
  views: number;

  @ApiProperty({ example: true, description: 'If the photo is published or not.' })
  @Column({ type: 'int', default: true})
  @Transform(({ value }) => value === 1)
  isPublished: boolean;
}