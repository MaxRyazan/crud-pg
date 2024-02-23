import {Request} from 'express'
import { Publisher } from '@entities/publisher.entity';
export interface ShareRequestExpress extends Request {
  publisher? : Publisher
}