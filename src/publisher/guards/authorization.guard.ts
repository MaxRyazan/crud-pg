import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { ShareRequestExpress } from '@/publisher/types/ShareRequestExpress';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: ShareRequestExpress = context.switchToHttp().getRequest();
    if(request.publisher) {
      return true;
    }
    throw new HttpException('Please log in!', 401)
  }

}