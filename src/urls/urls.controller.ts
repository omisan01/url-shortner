// MODULES //
import type { Response } from 'express';

// SERVICES //
import { UrlsService } from './urls.service.js';

// OTHERS //
import { Body, Controller, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
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

    @Get(":shortCode")
    async redirect(
        @Param('shortCode') shortCode: string,
        @Res() response: Response,
    ) {
        const url = await this.urlsService.findByShortCode(shortCode);

        if (!url) {
            throw new NotFoundException('Short URL not found');
        }

        return response.redirect(302, url.originalUrl);
    }


}
