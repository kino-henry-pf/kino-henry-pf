import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export default class MailService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))!;
  }

  async sendOrderEmail(to: string, orderId: string, total: number) {
    await this.resend.emails.send({
      from: 'Kino <noreply@onresend.dev>',
      to,
      subject: 'Confirmación de tu pedido',
      text: `
        Thank you for your purchase!
        Your order with ID ${orderId} has been confirmed. You should recieve your tickets within a few minutes.
      
        Total paid: $${total}
      `,
    });
  }

  async sendNewsLetter(to: string, content: string) {
    await this.resend.emails.send({
      from: 'Kino <newsletter@onresend.dev>',
      to,
      subject: 'Kino Weekly Newsletter',
      html: content,
    });
  }
}
