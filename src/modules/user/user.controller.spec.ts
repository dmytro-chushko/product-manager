import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserResponse } from 'src/types';
import {
  MODIFIED_USER_MOCK,
  RESPONSE_USER_MOCK,
} from 'src/utils/consts/mockup';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getAllUsers: jest.fn(),
    removeById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll => should return an array of user', async () => {
    const user = MODIFIED_USER_MOCK as IUserResponse;
    const users = [user];

    jest.spyOn(mockUserService, 'getAllUsers').mockReturnValue(users);

    const result = await controller.findAll();

    expect(mockUserService.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  describe('remove', () => {
    it('should remove and return a removed user', async () => {
      const id = RESPONSE_USER_MOCK.id;
      const user = RESPONSE_USER_MOCK as User;

      jest.spyOn(mockUserService, 'removeById').mockResolvedValue(user);

      const result = await controller.remove(id);

      expect(mockUserService.removeById).toHaveBeenCalled();
      expect(mockUserService.removeById).toHaveBeenCalledWith(id);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = RESPONSE_USER_MOCK.id;

      jest
        .spyOn(mockUserService, 'removeById')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);

      expect(mockUserService.removeById).toHaveBeenCalled();
      expect(mockUserService.removeById).toHaveBeenCalledWith(id);
    });
  });
});
