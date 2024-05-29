import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiTagName } from 'src/utils/consts';
import { UserRoute } from 'src/utils/consts/route';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { IUserResponse } from 'src/types';

@ApiTags(ApiTagName.USER)
@Controller(UserRoute.DEFAULT)
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Receive all users' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  findAll(): Promise<IUserResponse[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({ status: 201, type: User })
  @Delete(UserRoute.PARAM_ID)
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
