import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Transporter } from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer') as typeof import('nodemailer');

@Injectable()
export default class MailService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('OUTLOOK_EMAIL'),
        pass: this.configService.get<string>('OUTLOOK_PASSWORD'),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.transporter.verify((error) => {
      if (error) {
        this.logger.error('Email transporter verification failed:', error);
      } else {
        this.logger.log('Email transporter is ready');
      }
    });
  }

  async sendOrderEmail(to: string, orderId: string, total: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.transporter.sendMail({
        from: `"Kino" <${this.configService.get<string>('OUTLOOK_EMAIL')}>`,
        to,
        subject: 'Order Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for your purchase!</h2>
            <p>Your order with ID <strong>${orderId}</strong> has been confirmed.</p>
            <p>You will receive your tickets shortly.</p>
            <p style="font-size: 18px; margin-top: 20px;">
              Total paid: <strong>$${total.toFixed(2)}</strong>
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              If you have any questions, please contact our support team.
            </p>
          </div>
        `,
        text: `
Thank you for your purchase!
Your order with ID ${orderId} has been confirmed.
You will receive your tickets shortly.
Total paid: $${total.toFixed(2)}
        `,
      });
      this.logger.log(`Order confirmation email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send order email to ${to}:`, error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to send order email: ${error.message}`);
    }
  }

  async sendNewsLetter(to: string, content: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.transporter.sendMail({
        from: `"Kino Newsletter" <${this.configService.get<string>('OUTLOOK_EMAIL')}>`,
        to,
        subject: 'Kino Weekly Newsletter',
        html: content,
      });
      this.logger.log(`Newsletter sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send newsletter to ${to}:`, error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to send newsletter: ${error.message}`);
    }
  }
}
