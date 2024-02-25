import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { SharedRequestExpress } from '@/publisher/types/SharedRequestExpress';

export const GetRefreshTokenDecorator = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request: SharedRequestExpress = ctx.switchToHttp().getRequest();
  if(!request.headers.refreshtoken){
    throw new ForbiddenException('Refresh token not valid');
  }
  return request.headers.refreshtoken
})