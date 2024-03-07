import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateCommentDto } from './dto/commentDto';

@Injectable()
export class RateService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllRates() {
    return await this.prismaService.rate.findMany();
  }

  async getOneRate(id: number) {
    return this.prismaService.rate.findUnique({
      where: { id: id },
    });
  }

  async getRatesByPlaceId(id: number) {
    return this.prismaService.rate.findMany({
      where: { placeId: id },
      include: {
        user: true,
      },
    });
  }

  async getRatesAverage(id: number) {
    const rates = this.prismaService.rate.findMany({
      where: { placeId: id },
    });
  }

  async getRatesAverageByPlace(id: number): Promise<number> {
    const rates = await this.prismaService.rate.findMany({
      where: {
        placeId: id,
      },
      select: {
        value: true,
      },
    });

    const totalValues = rates.reduce((acc, rate) => acc + rate.value, 0);
    const average = totalValues / rates.length;

    return average;
  }

  async createComment(data: CreateCommentDto) {
    const { content, userId, placeId, value } = data;

    return this.prismaService.rate.create({
      data: {
        content,
        userId,
        placeId,
        value,
      },
    });
  }
}
