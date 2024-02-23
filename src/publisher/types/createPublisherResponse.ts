import { Publisher } from '@entities/publisher.entity';

export type CreatePublisherResponse = Omit<Publisher, 'password' | 'hashPassword' | 'articles'> & {token: string}
