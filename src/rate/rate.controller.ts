import {
  Controller,
  NotFoundException,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Body, Get, Param, Query, Req } from '@nestjs/common/decorators';
import { RateService } from './rate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rate')
@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  getAllRates() {
    return this.rateService.getAllRates();
  }

  @Get(':id')
  getOneRate(@Param('id', ParseIntPipe) id: number) {
    const rate = this.rateService.getOneRate(+id);
    return rate;
  }

  @Get('/place/:id')
  getRatesByPlaceId(@Param('id', ParseIntPipe) id: number) {
    const rate = this.rateService.getRatesByPlaceId(+id);
    return rate;
  }
  @Get('/average/:id')
  getRatesAverage(@Param('id', ParseIntPipe) id: number) {
    const average = this.rateService.getRatesAverage(+id);
    return average;
  }
}
