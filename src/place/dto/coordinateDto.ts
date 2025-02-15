import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';

export class CoordinateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  @IsNumber()
  readonly latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongitude()
  @IsNumber()
  readonly longitude: number;
}

export class CoordinateParameterDto {
  readonly coordinate: CoordinateDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly maxDistance: number;
}

export class CoordinateListParameterDto {
  readonly coordinateList: CoordinateDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly maxDistance: number;
}