  import {CanActivate,ExecutionContext,Injectable,ForbiddenException} from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  import { SetMetadata } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new ForbiddenException('Аутентификация не выполнена. Пожалуйста, предоставьте токен.');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request['user'] = payload;
      } catch {
        throw new ForbiddenException('Аутентификация не выполнена. Пожалуйста, предоставьте токен.');
      }
      return true;
    }
    
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  