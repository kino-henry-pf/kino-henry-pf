import { Module } from '@nestjs/common';
import MailService from '../mail/mail.service';
import { UsersModule } from '../users/users.module';
import NewsletterCron from './newsletter.cron';

@Module({
  imports: [UsersModule],
  providers: [NewsletterCron, MailService],
})
export class NewsletterModule {}
