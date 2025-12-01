import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('SUPABASE_URL')!;
        const anon = config.get<string>('SUPABASE_ANON_KEY')!;

        return createClient(url, anon, {
          auth: { flowType: 'pkce' },
        });
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
