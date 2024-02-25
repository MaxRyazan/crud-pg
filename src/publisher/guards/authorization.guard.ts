import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { SharedRequestExpress } from '@/publisher/types/SharedRequestExpress';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: SharedRequestExpress = context.switchToHttp().getRequest();
    if(request.publisher) {
      return true;
    }
    throw new HttpException('Please log in!', 401)
  }

}