import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { Body, Get, Param, Req } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.userservice.getOneUser(+id);
    return user;
  }
}
