import { Controller, Post } from '@nestjs/common';
import { Body, Req } from '@nestjs/common/decorators';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { resetPasswordDemandDto } from './dto/resetPasswordDemandDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authservice.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authservice.signin(signinDto);
  }

  @Post('reset-password')
  resetPasswordDemand(@Body() resetPasswordDemandDto: resetPasswordDemandDto) {
    return this.authservice.resetPasswordDemand(resetPasswordDemandDto);
  }
}
