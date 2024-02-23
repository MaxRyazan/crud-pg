import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ShareRequestExpress } from '@/publisher/types/ShareRequestExpress';
import { Publisher } from '@entities/publisher.entity';



export const GetPublisher = createParamDecorator((data: string, ctx: ExecutionContext): null | keyof Publisher | Publisher => {
  const request: ShareRequestExpress = ctx.switchToHttp().getRequest();

  if(!request.publisher) {
    return null;
  }
  if(data) {
    return request.publisher[data]
  }
  return request.publisher
})