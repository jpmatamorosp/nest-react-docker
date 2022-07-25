import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
//import { PassportModule } from '@nestjs/passport';
//import { JWTAuthGuard } from '../../core/guards/auth/jwt-auth.guard';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository]),
        //PassportModule.register({ defaultStrategy: 'jwt' })
      ],
      controllers: [UserController],
      providers: [UserService,
      //  JWTAuthGuard
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
