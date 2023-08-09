import { IsNotEmpty, IsEmail } from 'class-validator';

export class resetPasswordDemandDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
