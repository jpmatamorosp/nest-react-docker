import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSubscriber } from './user.subscribe';
//import { RolesGuard } from 'src/guards/role/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    /*{
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
    UserService,
    UserSubscriber
  ]
})
export class UserModule {}
