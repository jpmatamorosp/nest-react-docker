import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignupCredentialsDto } from './dto/signup.credentials.dto';
import { SignInCredentialsDto } from './dto/signin.credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
        ) {
    }

    async signUp(signupCredentialsDto: SignupCredentialsDto) {
        const { email, username, password } = signupCredentialsDto;

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password;
        
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string }> {
        const resp = await this.validateUserPassword(signInCredentialsDto)
        if (!resp) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload: JwtPayload = resp;
        const accessToken = await this.jwtService.sign(payload, {
            secret: "secret",
            expiresIn: '60m'
        })

        return {
            accessToken
        }
    }

    private async validateUserPassword(signinCredentialDto: SignInCredentialsDto): Promise <JwtPayload> {
        const { username, password } = signinCredentialDto
        const auth = await this.userRepository.findOne({ where: {username} })
        
        if (auth) {
            // check user password with hashed password stored in the database
            const hash = await this.hashPassword(password, auth.salt);
            if (hash === auth.password) {
                return {
                    username,
                    firstName: auth.firstName,
                    lastName: auth.lastName,
                    roles: []
                };
            }
        } 
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }
}
