import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '@entities/publisher.entity';
import { AuthorizationGuard } from '@/publisher/guards/authorization.guard';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService, AuthorizationGuard],
  imports: [TypeOrmModule.forFeature([Publisher])],
  exports: [PublisherService]
})
export class PublisherModule {}
