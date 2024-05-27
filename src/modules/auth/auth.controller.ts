import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiTagName } from 'src/utils/consts';
import { AuthRoute } from 'src/utils/consts/route';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from './auth-jwt.guard';
import { AuthService } from './auth.service';

@ApiTags(ApiTagName.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "User's registration" })
  @ApiResponse({
    status: 201,
    description: 'Registrate new user',
  })
  @Post(AuthRoute.REGISTR)
  registration(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.registration(dto, response);
  }

  @ApiOperation({ summary: "User's authentication" })
  @ApiResponse({
    status: 201,
    description: 'Sign in new user',
  })
  @Post(AuthRoute.LOGIN)
  login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response);
  }

  @ApiOperation({ summary: "User's logging out" })
  @ApiResponse({
    status: 201,
    description: 'User log out',
  })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post(AuthRoute.LOGOUT)
  logOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logOut(response);
  }
}
