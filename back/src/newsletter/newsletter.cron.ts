import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import MailService from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class NewsletterCron {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  @Cron('*/30 * * * * *') // every 30 seconds
  async sendWeeklyNewsletter() {
    const users = await this.usersService.findAll();

    const content = `
      <h1>Kino Weekly Newsletter</h1>
      <p>Your weekly update of new movies and promotions!</p>
      <p>Thank you for being part of Kino 🎬</p>
    `;
    for (const user of users) {
      this.mailService
        .sendNewsLetter(user.email, content)
        .catch((err) => console.error('Newsletter error', err));
    }
  }
}
