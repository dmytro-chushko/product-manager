import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoute } from 'src/utils/consts/route';
import { User } from './entities/user.entity';
import { ApiTagName } from 'src/utils/consts';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';

@ApiTags(ApiTagName.USER)
@Controller(UserRoute.DEFAULT)
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Receive all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({ status: 201, type: User })
  @Delete(UserRoute.PARAM_ID)
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
