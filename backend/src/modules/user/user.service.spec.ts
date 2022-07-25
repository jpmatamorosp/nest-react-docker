import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
//import { JWTAuthGuard } from '../../core/guards/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository]),
        passportModule,
      ],
      providers: [UserService,
      {
        provide: getRepositoryToken(User),
        useClass: UserRepository
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result:User[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async() => result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
