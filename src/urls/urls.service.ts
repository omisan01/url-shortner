// UTILS //
import { generateShortCode } from '../common/utils/base62.util.js';

// OTHERS //
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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

    async createUrl(dto: CreateUrlDto) {
        const maxAttempts = 3;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            const shortCode = generateShortCode();

            try {
                const url = this.urlRepository.create({
                    shortCode,
                    originalUrl: dto.url
                })

                const savedUrl = await this.urlRepository.save(url);

                return {
                    id: savedUrl.id,
                    shortCode: savedUrl.shortCode,
                    shortUrl: `http://localhost:3000/${savedUrl.shortCode}`,
                    originalUrl: savedUrl.originalUrl,
                }
            } catch (error) {
                const isShortCodeCollision =
                    error instanceof QueryFailedError &&
                    (error.driverError as { code?: string }).code === '23505' &&
                    (error.driverError as { constraint?: string }).constraint ===
                    'urls_short_code_key';


                if (isShortCodeCollision && attempt < maxAttempts) {
                    continue;
                }

                if (isShortCodeCollision) {
                    throw new InternalServerErrorException(
                        'Could not generate a unique short code',
                    );
                }

                throw error;
            }
        }

        throw new InternalServerErrorException("Could not generate a unique short code")
    }

    async findByShortCode(shortCode: string) {
        const url = this.urlRepository.findOne({
            where: { shortCode }
        })

        if (!url) {
            return null
        }
        return url;
    }

}
