import { IsUUID } from 'class-validator';

export class CreatePaymentPreferenceDto {
  @IsUUID()
  orderId: string;
}
