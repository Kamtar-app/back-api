import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
