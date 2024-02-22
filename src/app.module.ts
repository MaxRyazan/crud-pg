import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { PublisherModule } from './publisher/publisher.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig from '@/config/database.config';

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
}
