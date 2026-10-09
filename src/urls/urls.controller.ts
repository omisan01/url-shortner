import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlsService } from './urls.service.js';
import { CreateUrlDto } from './dto/create-url.dto.js';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urlsService: UrlsService) { }

    @Get("health")
    getHealth() {
        return this.urlsService.getHealth()
    }

    @Post()
    createUrl(@Body() dto: CreateUrlDto) {
        return this.urlsService.createUrl(dto)
    }

    @Get()
    getAllUrls() {
        return this.urlsService.getAllUrls();
    }
}
