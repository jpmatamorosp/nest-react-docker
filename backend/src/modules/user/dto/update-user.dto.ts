import { MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @MaxLength(50)
    @ApiProperty({ example: "User first name", description: 'The first name of the user.' })
    firstName: string;

    @MaxLength(50)
    @ApiProperty({ example: "User first name", description: 'The first name of the user.' })
    lastName: string;

    @MaxLength(50)
    @IsEmail()
    @ApiProperty({ example: "user@gmail.com", description: 'The email address of the user.' })
    email: string;
}
