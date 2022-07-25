import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET
        });
    }

    async validate(payload: JwtPayload, done: Function) {
        const { username } = payload;
        const user = await this.userRepository.findOne({ where: {username} });
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}