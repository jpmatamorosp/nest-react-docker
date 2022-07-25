import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength } from "class-validator"

export class SignInCredentialsDto {
    @ApiProperty({ minimum: 4, maximum: 20, example: "user1", description: 'The username of the user.' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @ApiProperty({ minimum: 6, maximum: 20, example: "Pa\$$w0rd", description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string
}
