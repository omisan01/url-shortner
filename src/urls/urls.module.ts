// MODULES //
import { RedisModule } from '../redis/redis.module.js';

// CONTROLLERS //
import { UrlsController } from './urls.controller.js';

// SERVICES //
import { UrlsService } from './urls.service.js';

// OTHERS //
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), RedisModule],
  controllers: [UrlsController],
  providers: [UrlsService],
  exports: [UrlsService]
})
export class UrlsModule { }
