import {Request} from 'express'
import { Publisher } from '@entities/publisher.entity';
import { IncomingHttpHeaders } from 'http';
export interface SharedRequestExpress extends Request {
  publisher? : Publisher,
  headers: IncomingHttpHeaders & {refreshtoken: string}
}