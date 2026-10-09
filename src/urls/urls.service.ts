import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlsService {
    getHealth() {
        return {
            status: 'ok',
            service: "url-shortener"
        }
    }
}
