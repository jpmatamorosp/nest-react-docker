import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserModule } from '../../modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/entities/user.entity';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
const APP_EXPIRES: string = process.env.APP_EXPIRES || '60s';

@Global()
@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
          expiresIn: APP_EXPIRES
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})
export class AuthModule {}
