import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ example: "Photo name", description: 'The name of the photo.' })
  name: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty({ example: "Photo description", description: 'The description of the photo.' })
  description: string;

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ example: "photo.png", description: 'The file name.' })
  filename: string;
}