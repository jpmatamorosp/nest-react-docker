import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
//import { Photo } from './modules/photo/entities/photo.entity';
import { PhotoModule } from './modules/photo/photo.module';
//import { Todo } from './modules/todo/entities/todo.entity';
import { TodoModule } from './modules/todo/todo.module';
//import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import * as typeOrmConfig from './shared/configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    TodoModule,
    PhotoModule,
    UserModule
  ]
})
export class AppModule {}
