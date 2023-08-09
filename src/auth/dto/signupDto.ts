import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsOptional()
  readonly companyName: string;

  @IsOptional()
  readonly siret: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  readonly isVisibleOnMap: boolean;
}
