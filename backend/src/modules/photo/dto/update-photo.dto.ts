import { ApiProperty } from '@nestjs/swagger';
import { Max } from "class-validator";

export class UpdatePhotoDto {
    @Max(50)
    @ApiProperty({ example: "Photo name", description: 'The name of the photo.' })
    name?: string;

    @Max(50)
    @ApiProperty({ example: "Photo description", description: 'The description of the photo.' })
    description!: string;

    @Max(50)
    @ApiProperty({ example: "photo.png", description: 'The file name.' })
    filename!: string;
}