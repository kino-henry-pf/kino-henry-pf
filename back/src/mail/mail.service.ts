import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER ?? '',
        pass: process.env.GMAIL_PASS ?? '',
      },
    });
  }

  async sendOrderEmail(to: string, orderId: string, total: number) {
    const message = `
      ¡Gracias por tu compra!
      Tu pedido con ID ${orderId} ha sido confirmado.
      Total pagado: $${total}
    `;

    await this.transporter.sendMail({
      from: `"Mi App" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Confirmación de tu pedido',
      text: message,
    });
  }
}
