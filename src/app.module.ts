import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { PublisherModule } from './publisher/publisher.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from '@/config/database.config';
import { AuthorizationMiddleware } from '@/publisher/middlewares/authorization.middleware';

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
