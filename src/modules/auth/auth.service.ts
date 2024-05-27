import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

import { IUserResponse } from 'src/types/IUserResponse';
import { ExceptionMessage } from 'src/utils/consts';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CookiesDescr } from 'src/utils/consts/CookiesDescr';

const SALT = 7;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(
    dto: CreateUserDto,
    response?: Response,
  ): Promise<IUserResponse> {
    const candidate = await this.userService.findOneByEmail(dto.email);
    if (candidate) {
      throw new ConflictException(ExceptionMessage.ALREADY_EXIST);
    }

    const hashPassword = await bcrypt.hash(dto.password, SALT);
    const newUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    response &&
      response.cookie(CookiesDescr.KEY, this.generateToken(newUser), {
        httpOnly: true,
      });

    return { id: newUser.id, email: newUser.email };
  }

  async login(dto: CreateUserDto, response: Response): Promise<IUserResponse> {
    const user = await this.validateUser(dto);

    response.cookie(CookiesDescr.KEY, this.generateToken(user), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { id: user.id, email: user.email };
  }

  logOut(response: Response): void {
    response.clearCookie(CookiesDescr.KEY);
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTH);
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTH);
    }

    return user;
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
