
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UrlsService } from '../urls/urls.service.js';

@Controller()
export class RedirectController {
    constructor(private readonly urlsService: UrlsService) { }

    @Get(':shortCode')
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
