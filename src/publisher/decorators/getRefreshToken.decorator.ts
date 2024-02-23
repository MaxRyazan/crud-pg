import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ShareRequestExpress } from '@/publisher/types/ShareRequestExpress';

export const GetRefreshTokenDecorator = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request: ShareRequestExpress = ctx.switchToHttp().getRequest();
  if(!request.headers.refreshtoken){
    throw new ForbiddenException('Refresh token not valid');
  }
  return request.headers.refreshtoken
})