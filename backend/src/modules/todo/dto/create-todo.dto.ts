import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: "Task name", description: 'The name of the task.' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: "Task description", description: 'The task description.' })
    description: string;
}
