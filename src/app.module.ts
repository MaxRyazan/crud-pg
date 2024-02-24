import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { PublisherModule } from './publisher/publisher.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from '@/config/database.config';
import { AuthorizationMiddleware } from '@/publisher/middlewares/authorization.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfig],
      isGlobal: true,
      cache: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({...configService.get('database')}),
    }),
    CacheModule.register({
      ttl: 90 * 1000,
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: "6379"
    }),
    ArticleModule,
    PublisherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
