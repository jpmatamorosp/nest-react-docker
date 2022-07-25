import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Todo {
    @ApiProperty({ example: 1, description: 'The task database id.' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Task name", description: 'The name of the task.' })
    @Column({
        type: 'varchar',
        length: 100
    })
    name: string;

    @ApiProperty({ example: "Task description", description: 'The description of the task.' })
    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    description: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.todos, { eager: false})
    user: User;

    @Column({ type: "int"})
    userId: number;

    @ApiProperty({ example: false, description: 'If the task is completed or not.' })
    @Column({ type: 'int', default: false})
    @Transform(({ value }) => value === 1)
    isCompleted: boolean;
}
