import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity | null;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeaders =
        req.headers.authorization || req.headers.authorization;
      if (
        !authHeaders ||
        isArray(authHeaders) ||
        !authHeaders.startsWith('Bearer')
      ) {
        req.currentUser = null;
        next();
        return;
      } else {
        const token = authHeaders.split(' ')[1];
        const { id } = <JWTPayload>(
          verify(token, process.env.ACCESS_TOKEN_SECRET as string)
        );
        const user = await this.userService.findOne(+id);
        req.currentUser = user;
        next();
      }
    } catch (error) {
      req.currentUser = null;
      next();
      // throw new UnauthorizedException('Token expired');
    }
  }
}

interface JWTPayload {
  id: string;
}
