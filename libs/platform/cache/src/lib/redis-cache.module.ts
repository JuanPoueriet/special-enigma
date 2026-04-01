import { Module, Global, DynamicModule, InjectionToken } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import Redis, { RedisOptions } from 'ioredis';

function createRedisClient(config: RedisOptions | string): Redis {
  const baseOptions: RedisOptions = typeof config === 'string' ? {} : config;
  const resilientOptions: RedisOptions = {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    retryStrategy: (attempt: number) =>
      attempt <= 3 ? Math.min(attempt * 100, 1000) : null,
    ...baseOptions,
  };

  const client =
    typeof config === 'string'
      ? new Redis(config, resilientOptions)
      : new Redis(resilientOptions);

  client.on('error', (error) => {
    // Intentionally swallow to avoid unhandled `error` events when Redis is optional in local/dev.
    // Consumers should rely on command-level failures and health checks for explicit observability.
    void error;
  });

  return client;
}

@Global()
@Module({})
export class RedisCacheModule {
  static forRoot(options: RedisOptions): DynamicModule {
    return {
      module: RedisCacheModule,
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: () => createRedisClient(options),
        },
        RedisCacheService,
      ],
      exports: [RedisCacheService, 'REDIS_CLIENT'],
    };
  }

  static forRootAsync(options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFactory: (
      ...args: any[]
    ) => Promise<RedisOptions | string> | RedisOptions | string;
    inject?: InjectionToken[];
  }): DynamicModule {
    return {
      module: RedisCacheModule,
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: async (...args) => {
            const config = await options.useFactory(...args);
            return createRedisClient(config);
          },
          inject: options.inject || [],
        },
        RedisCacheService,
      ],
      exports: [RedisCacheService, 'REDIS_CLIENT'],
    };
  }
}
