import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signupDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signinDto';
import * as speakeasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { resetPasswordDemandDto } from './dto/resetPasswordDemandDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly Jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { firstname, lastname, phoneNumber, email, password } = signupDto;

    // find user by email
    const user = await this.prismaService.user.findUnique({ where: { email } });

    // check is user already exists
    if (user) throw new ConflictException('User already exists');

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    await this.prismaService.user.create({
      data: {
        firstname,
        lastname,
        companyName: signupDto?.companyName,
        siret: signupDto?.siret,
        phoneNumber,
        email,
        password: hash,
        isVisibleOnMap: signupDto?.isVisibleOnMap,
      },
    });

    return { data: 'user succesfully created' };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    // find user by email
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('something does not match');

    const payload = {
      sub: user.userId,
      email: user.email,
    };
    const token = this.Jwtservice.sign(payload, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY'),
    });

    return {
      token,
      user: {
        firstname: user.firstname,
        email: user.email,
      },
    };
  }

  async resetPasswordDemand(resetPasswordDemandDto: resetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;

    // find user by email
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const code = speakeasy.totp({
      secret: this.configService.get('OTP_CODE'),
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    });

    const url = 'http://127.0.0.1:3000/auth/reset-password-confirmation';
  }
}
