
import { Module } from '@nestjs/common';
import { UrlsModule } from '../urls/urls.module.js';
import { RedirectController } from './redirect.controller.js';

@Module({
    imports: [UrlsModule],
    controllers: [RedirectController],
})
export class RedirectModule { }
