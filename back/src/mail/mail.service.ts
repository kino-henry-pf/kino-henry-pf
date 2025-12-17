import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

@Injectable()
export default class MailService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.configService.get<string>('OUTLOOK_EMAIL'),
        pass: this.configService.get<string>('OUTLOOK_PASSWORD'),
      },
    });

    this.transporter
      .verify()
      .then(() => this.logger.log('Email transporter is ready'))
      .catch((err) =>
        this.logger.error('Email transporter verification failed', err),
      );
  }

  async sendOrderEmail(to: string, orderId: string, total: number) {
    await this.transporter.sendMail({
      from: `"Kino" <${this.configService.get<string>('OUTLOOK_EMAIL')}>`,
      to,
      subject: 'Order Confirmation',
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Your order with ID <strong>${orderId}</strong> has been confirmed.</p>
        <p>Total paid: <strong>$${total.toFixed(2)}</strong></p>
      `,
      text: `
Thank you for your purchase!
Order ID: ${orderId}
Total paid: $${total.toFixed(2)}
      `,
    });

    this.logger.log(`Order confirmation email sent to ${to}`);
  }

  async sendNewsLetter(to: string, content: string) {
    await this.transporter.sendMail({
      from: `"Kino Newsletter" <${this.configService.get<string>('OUTLOOK_EMAIL')}>`,
      to,
      subject: 'Kino Weekly Newsletter',
      html: content,
    });

    this.logger.log(`Newsletter sent to ${to}`);
  }
}
