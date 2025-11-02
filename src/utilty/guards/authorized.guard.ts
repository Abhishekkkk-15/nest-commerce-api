import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'allowedRoles',
      context.getHandler(),
    );
    console.log('Fun', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const result = request.currentUser?.role
      ?.map((role: string) => allowedRoles.includes(role))
      ?.find((val: boolean) => val === true);
    console.log(request.currentUser?.role);
    if (result) return true;
    throw new UnauthorizedException('Sorry, you are not allowed.');
  }
}
