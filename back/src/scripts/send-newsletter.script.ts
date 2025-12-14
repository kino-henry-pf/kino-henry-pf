import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import NewsletterCron from 'src/newsletter/newsletter.cron';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const newsletter = app.get(NewsletterCron);

  await newsletter.sendWeeklyNewsletter();

  await app.close();
}

void bootstrap();
