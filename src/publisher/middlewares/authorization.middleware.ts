import { Injectable, NestMiddleware } from '@nestjs/common';
import { SharedRequestExpress } from '@/publisher/types/SharedRequestExpress';
import { NextFunction, Response } from 'express';
import { PublisherService } from '@/publisher/publisher.service';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@/secret-variables';

@Injectable()
export class AuthorizationMiddleware implements  NestMiddleware {
  constructor(private readonly publisherService: PublisherService) {}

  async use(req: SharedRequestExpress, res: Response, next: NextFunction) {
    if(!req.headers.authorization && !req.headers.refreshtoken) {
      req.publisher = null;
      next();
      return;
    }

    const token: string = req.headers.authorization ?? req.headers.refreshtoken

    try {
      const publisherData: any = verify(token, JWT_SECRET);
      req.publisher = await this.publisherService.findById(publisherData.id);
      next();
      return;
    } catch (e) {
      req.publisher = null;
      next();
    }
  }
}
