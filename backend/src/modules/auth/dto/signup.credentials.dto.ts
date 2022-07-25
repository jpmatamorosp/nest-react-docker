
import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator"

export class SignupCredentialsDto {
    @MaxLength(100)
    @IsEmail()
    @ApiProperty({ example: "user@gmail.com", description: 'The email address of the user.' })
    email: string;

    @ApiProperty({ minimum: 4, maximum: 20 })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @ApiProperty({ minimum: 6, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak'}
    )
    password: string
}