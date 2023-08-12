import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty()
  @IsOptional()
  readonly companyName: string;

  @ApiProperty()
  @IsOptional()
  readonly siret: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly isVisibleOnMap: boolean;
}
