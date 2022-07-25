import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
//import { Role } from '../../../core/guards/role/role.enum';
import { Todo } from '../../todo/entities/todo.entity';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        required: false
    })
    @Column({
        type: "varchar",
        length: 100,
        nullable: true 
    })
    firstName: string;

    @ApiProperty({
        required: false
    })
    @Column({
        type: "varchar",
        length: 100,
        nullable: true 
    })
    lastName: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false,
    })
    email: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false 
    })
    username: string;

    @Exclude()
    @Column()
    salt: string

    @Exclude()
    @Column({
        type: "varchar",
        nullable: false
    })
    password: string;

    // @Transform(({ value }) => value.name)
    //roles: Role[];

    @OneToMany(() => Todo, todo => todo.user, { eager: true })
    todos: Todo[];

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}
