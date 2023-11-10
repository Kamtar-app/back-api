import { Controller, Post } from '@nestjs/common';
import { Body, Get, Req } from '@nestjs/common/decorators';
import { PlaceService } from './place.service';
import { ApiTags } from '@nestjs/swagger';
import { CoordinateDto, CoordinateParameterDto } from './dto/coordinateDto';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  @Get('place-around-one-coordinates')
  placeAroundOneCoordinates(@Body() coordinateParameterDto: CoordinateParameterDto) {

    return this.placeService.placeAroundOneCoordinates(coordinateParameterDto);




    // - lieu à x km autour d'une position geo
    // - Liste des catégories de lieux
    // - Les lieux avec les meilleurs note à x km
    // - Les infos sur l'utilisateur connecté
  }

  @Get('place-around-many-coordinates')
  placeAroundManyCoordinates(
    // @Body() coordinateDto: CoordinateDto
  ) {
    return this.placeService.placeAroundManyCoordinates();
  }
}
