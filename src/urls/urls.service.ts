import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity.js';

@Injectable()
export class UrlsService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>,
    ) { }

    getHealth() {
        return {
            status: 'ok',
            service: "url-shortener"
        }
    }

    createUrl(dto: CreateUrlDto) {
        return {
            message: "URL validation successful",
            originalUrl: dto.url
        }
    }

    async getAllUrls() {
        return this.urlRepository.find();
    }

}
