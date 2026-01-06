import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterUserDto } from './register-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  hello() {
    return { message: 'hello' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.appService.registerUser(registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: { identifier: string; password: string }) {
    return this.appService.loginUser(loginDto.identifier, loginDto.password);
  }

  @Post('swipe')
  recordSwipe(
    @Body()
    swipeDto: {
      username: string;
      pokemonId: number;
      action: 'like' | 'dislike';
      name?: string;
      joke?: string;
    },
  ) {
    console.log('Received swipe data:', swipeDto);
    return this.appService.recordSwipe(swipeDto);
  }

  @Post('get-swipes')
  getSwipes(@Body() getSwipesDto: { username: string }) {
    return this.appService.getSwipes(getSwipesDto.username);
  }
}
