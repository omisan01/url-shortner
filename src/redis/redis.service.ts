import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);
    private readonly client: Redis

    constructor(configService: ConfigService) {
        this.client = new Redis({
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: configService.get<number>('REDIS_PORT', 6379),
            lazyConnect: true,
            maxRetriesPerRequest: 1,
        })

        this.client.on('error', (error) => {
            this.logger.error(`Redis connection error: ${error.message}`);
        });

    }

    async onModuleInit() {
        try {
            await this.client.connect();
        } catch (error) {
            this.logger.error(`Could not connect to Redis`, error)
        }
    }


    async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (error) {
            this.logger.warn(`Redis GET failed for ${key}`);
            return null;
        }
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        try {
            await this.client.set(key, value, 'EX', ttl)

        } catch {
            this.logger.warn(`REDIS SET Failed for ${key}`)
        }
    }


    async onModuleDestroy() {
        if (this.client.status === 'ready') {
            await this.client.quit()
        } else {
            this.client.disconnect()
        }
    }





}