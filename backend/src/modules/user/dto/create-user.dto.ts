import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsString, MinLength, Matches } from 'class-validator';
import { Role } from '../../../shared/guards/role/role.enum';

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    @ApiProperty({ example: "User first name", description: 'The first name of the user.' })
    firstName: string;

    @IsString()
    @MaxLength(100)
    @ApiProperty({ example: "User first name", description: 'The first name of the user.' })
    lastName: string;

    @MaxLength(100)
    @IsEmail()
    @ApiProperty({ example: "user@gmail.com", description: 'The email address of the user.' })
    email: string;

    @ApiProperty({ minimum: 4, maximum: 20, example: "user1", description: 'The username of the user.' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ minimum: 6, maximum: 20, example: "Pa\$$w0rd", description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak'}
    )
    password: string;

    //@ApiProperty({ enum: ['Admin', 'User'], example: "User", description: 'Role of the user.'})
    //role: Role;
}
