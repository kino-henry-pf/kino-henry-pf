import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

console.log('ENV URL:', configService.get<string>('SUPABASE_URL'));
console.log('ENV ANON KEY:', configService.get<string>('SUPABASE_ANON_KEY'));

export const supabase = createClient(
  "https://gvxzhbhfbmoxeyoszhup.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eHpoYmhmYm1veGV5b3N6aHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNzQ3NjcsImV4cCI6MjA3OTk1MDc2N30.1ZPDIM038BjIhNvySfjIZFKkzQX8wsoJwm0PBwb_2AM")
;

