import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
