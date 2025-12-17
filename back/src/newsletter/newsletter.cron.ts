import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import MailService from '../mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export default class NewsletterCron {
  private readonly logger = new Logger(NewsletterCron.name);

  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  @Cron('*/10 * * * *')
  async sendWeeklyNewsletter() {
    try {
      const users = await this.usersService.findAll();
      this.logger.log(`Sending newsletter to ${users.length} users`);

      const content = this.generateNewsletterContent();

      let successCount = 0;
      let failCount = 0;

      for (const user of users) {
        try {
          await this.mailService.sendNewsLetter(user.email, content);
          successCount++;
        } catch (err) {
          failCount++;
          this.logger.error(`Failed to send newsletter to ${user.email}:`, err);
        }
      }

      this.logger.log(
        `Newsletter batch completed: ${successCount} sent, ${failCount} failed`,
      );
    } catch (error) {
      this.logger.error('Failed to send newsletter batch:', error);
    }
  }

  private generateNewsletterContent(): string {
    return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 32px;">🎬 Kino Weekly</h1>
      <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your weekly dose of cinema magic</p>
    </div>

    <!-- Main Content -->
    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
      
      <!-- This Week's Highlights -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">🌟 This Week's Highlights</h2>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <h3 style="color: #667eea; margin-top: 0;">New Releases</h3>
          <p style="color: #555; line-height: 1.6;">Discover the latest films hitting theaters this week. From blockbuster action to intimate dramas, there's something for every movie lover.</p>
        </div>
      </div>

      <!-- Featured Promotions -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 3px solid #764ba2; padding-bottom: 10px;">🎟️ Special Offers</h2>
        <div style="background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 8px; margin-top: 15px;">
          <h3 style="color: #333; margin-top: 0;">Weekend Specials</h3>
          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Don't miss out on exclusive deals and discounts available only to Kino members.</p>
          <a href="#" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">View All Offers</a>
        </div>
      </div>

      <!-- Trending Now -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">🔥 Trending Now</h2>
        <div style="display: flex; gap: 15px; margin-top: 15px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 150px; background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="font-size: 24px; margin: 0;">🎭</p>
            <p style="color: #667eea; font-weight: bold; margin: 10px 0 5px 0;">Most Popular</p>
            <p style="color: #777; font-size: 14px; margin: 0;">This week's favorites</p>
          </div>
          <div style="flex: 1; min-width: 150px; background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="font-size: 24px; margin: 0;">⭐</p>
            <p style="color: #667eea; font-weight: bold; margin: 10px 0 5px 0;">Top Rated</p>
            <p style="color: #777; font-size: 14px; margin: 0;">Audience picks</p>
          </div>
        </div>
      </div>

      <!-- Coming Soon -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 3px solid #764ba2; padding-bottom: 10px;">📅 Coming Soon</h2>
        <p style="color: #555; line-height: 1.6; margin-top: 15px;">Get a sneak peek at the upcoming releases you won't want to miss. Mark your calendars!</p>
      </div>

      <!-- Community Picks -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">💬 Community Picks</h2>
        <div style="background-color: #f0f4ff; padding: 15px; border-left: 4px solid #667eea; margin-top: 15px;">
          <p style="color: #555; line-height: 1.6; margin: 0; font-style: italic;">"See what other Kino members are watching and loving this week. Join the conversation!"</p>
        </div>
      </div>

      <!-- Footer Message -->
      <div style="text-align: center; padding-top: 20px; border-top: 2px solid #eee;">
        <p style="color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Thank you for being part of Kino! 🎬</p>
        <p style="color: #777; font-size: 14px; margin: 5px 0;">We're passionate about bringing the best cinema experience to you every week.</p>
        <div style="margin-top: 20px;">
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Browse Movies</a> | 
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">My Account</a> | 
          <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p style="margin: 5px 0;">© ${new Date().getFullYear()} Kino. All rights reserved.</p>
      <p style="margin: 5px 0;">You're receiving this because you subscribed to Kino updates.</p>
    </div>
  </div>
`;
  }
}
