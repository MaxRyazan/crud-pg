import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SharedRequestExpress } from '@/publisher/types/SharedRequestExpress';
import { Publisher } from '@entities/publisher.entity';



export const GetPublisher = createParamDecorator((data: string, ctx: ExecutionContext): null | keyof Publisher | Publisher => {
  const request: SharedRequestExpress = ctx.switchToHttp().getRequest();

  if(!request.publisher) {
    return null;
  }
  if(data) {
    return request.publisher[data]
  }
  return request.publisher
})