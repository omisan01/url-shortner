import { Controller, Get } from '@nestjs/common';
import { UrlsService } from './urls.service.js';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urls: UrlsService) { }

    @Get("health")
    getHealth() {
        return this.urls.getHealth()
    }
}
