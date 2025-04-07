import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: any) {
    return this.userService.login(user);
  }

  @Post('getUserInfo')
  async getUserInfo(@Body() user: any) {
    return this.userService.findOne(user.id);
  }
    
}
