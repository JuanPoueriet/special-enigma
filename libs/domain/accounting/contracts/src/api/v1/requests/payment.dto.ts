import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class RecordPaymentDto {
  @IsString()
  @IsNotEmpty()
  reference!: string;

  @IsDateString()
  paymentDate!: string;

  @IsString()
  @IsNotEmpty()
  amount!: string;

  @IsString()
  @IsNotEmpty()
  bankAccountCode!: string;

  @IsString()
  @IsNotEmpty()
  receivableAccountCode!: string;
}
