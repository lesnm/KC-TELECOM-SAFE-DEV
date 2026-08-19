import { Module } from '@nestjs/common';
import { AirtimeController } from './airtime.controller';
import { AirtimeService } from './airtime.service';
import { HttpVtuProvider } from './providers/http-vtu.provider';

@Module({
  controllers: [AirtimeController],
  providers: [
    AirtimeService,
    {
      provide: 'AIRTIME_PROVIDER',
      useFactory: () => {
        const name = process.env.VTU_PROVIDER_NAME ?? 'HTTP';
        return new HttpVtuProvider({
          baseUrl: process.env.VTU_BASE_URL ?? '',
          apiKey: process.env.VTU_API_KEY ?? '',
          timeoutMs: Number(process.env.VTU_TIMEOUT_MS ?? 10000),
          name,
        });
      },
    },
  ],
  exports: [AirtimeService],
})
export class AirtimeModule {}
