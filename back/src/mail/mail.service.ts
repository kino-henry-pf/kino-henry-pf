import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QRCode from 'qrcode';

@Injectable()
export default class MailService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))!;
  }

  async sendOrderEmail(
    to: string,
    orderId: string,
    total: number,
  ): Promise<void> {
    const qrData = JSON.stringify({ orderId });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const qrCodeBuffer = (await QRCode.toBuffer(qrData, {
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'M',
    })) as Buffer;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const qrCodeDataURL = (await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
    })) as string;

    await this.resend.emails.send({
      from: 'Kino <onboarding@resend.dev>',
      to,
      subject: 'Order confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Thank you for your purchase!</h1>
            <p>Your order with ID of <strong>${orderId}</strong> has been confirmed.</p>
            <p>Total paid: <strong>$${total}</strong></p>
            
            <div style="margin: 30px 0; text-align: center;">
              <img src="${qrCodeDataURL}" alt="QR Code" style="max-width: 300px;" />
              <p style="color: #666; font-size: 14px;">Scan this code to view your order</p>
            </div>
          </div>
      `,
      attachments: [
        {
          filename: 'order-qr-code.png',
          content: qrCodeBuffer,
          contentType: 'image/png',
        },
      ],
    });
  }

  async sendNewsLetter(to: string, content: string): Promise<void> {
    await this.resend.emails.send({
      from: 'Kino <onboarding@resend.dev>',
      to: 'kinohenrypf@gmail.com',
      subject: 'Kino Weekly Newsletter',
      html: content,
    });
  }
}
