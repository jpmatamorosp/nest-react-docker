
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"
import { Request } from 'express';
import { JWTAuthGuard } from '../../shared/guards/auth/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin.credentials.dto';
import { SignupCredentialsDto } from './dto/signup.credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    
    @Post('/signup')
    @ApiOperation({ summary: 'Signup' })
    async signUp(
        @Body() signupCredentialsDto: SignupCredentialsDto
    ) {
        return await this.authService.signUp(signupCredentialsDto)
    }

    @Post('/signin')
    @ApiOperation({ summary: 'Signin' })
    async signIn(
        @Body() signinCredentialsDto: SignInCredentialsDto
    ): Promise<{ accessToken: string }>{
        return await this.authService.signIn(signinCredentialsDto)
    }

    @UseGuards(JWTAuthGuard)
    @Get('user-info')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'User info' })
    getUserInfo(@Req() req: Request) {
        return req.user
    }
}