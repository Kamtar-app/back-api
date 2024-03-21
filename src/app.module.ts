import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlaceModule } from './place/place.module';
import { RateModule } from './rate/rate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PlaceModule,
    RateModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
