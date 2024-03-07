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

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly Jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async getOneUser(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id },
      include: {
        rank: true
      },
    });
  }

  async getAllUserWithLimit(limit: number) {
    return await this.prismaService.user.findMany({
      skip: 0,
      take: limit,
      include: {
        rank: true
      },
    });
  }
}
