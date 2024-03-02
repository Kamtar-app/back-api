import {
  Controller,
  NotFoundException,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Body, Get, Param, Query, Req } from '@nestjs/common/decorators';
import { PlaceService } from './place.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CoordinateDto,
  CoordinateListParameterDto,
  CoordinateParameterDto,
} from './dto/coordinateDto';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  getAllPlaces() {
    return this.placeService.getAllPlaces();
  }

  @Get(':id')
  getOnePlace(@Param('id', ParseIntPipe) id: number) {
    const place = this.placeService.getOnePlace(+id);
    return place;
  }

  @Get('place-around-one-coordinates')
  placeAroundOneCoordinates(
    @Body() coordinateParameterDto: CoordinateParameterDto,
  ) {
    return this.placeService.placeAroundOneCoordinates(coordinateParameterDto);

    // - lieu à x km autour d'une position geo
    // - Liste des catégories de lieux
    // - Les lieux avec les meilleurs note à x km
    // - Les infos sur l'utilisateur connecté
  }

  @Post('place-around-many-coordinates')
  placeAroundManyCoordinates(@Body() coordinateListParameterDto) {
    console.log(coordinateListParameterDto);

    return this.placeService.placeAroundManyCoordinates(
      coordinateListParameterDto,
    );
  }
}
