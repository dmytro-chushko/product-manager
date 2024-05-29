import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IUserResponse } from 'src/types';
import {
  MODIFIED_USER_MOCK,
  REQUEST_USER_MOCK,
  RESPONSE_USER_MOCK,
} from 'src/utils/consts/mockup';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    const createUserDto = REQUEST_USER_MOCK as CreateUserDto;

    const user = RESPONSE_USER_MOCK as User;

    jest.spyOn(mockUserRepository, 'create').mockReturnValue(user);
    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.create(createUserDto);

    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of users', async () => {
    const user = RESPONSE_USER_MOCK as User;
    const users = [user];

    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  it('should find a user by a given id and return its data', async () => {
    const email = RESPONSE_USER_MOCK.email;
    const user = RESPONSE_USER_MOCK as User;

    jest.spyOn(mockUserRepository, 'findOneBy').mockReturnValue(user);

    const result = await service.findOneByEmail(email);

    expect(mockUserRepository.findOneBy).toHaveBeenCalled();
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    expect(result).toEqual(user);
  });

  describe('removeById', () => {
    it('should remove and return a removed user', async () => {
      const id = RESPONSE_USER_MOCK.id;
      const user = RESPONSE_USER_MOCK as User;

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(mockUserRepository, 'remove').mockReturnValue(user);

      const result = await service.removeById(id);

      expect(mockUserRepository.findOneBy).toHaveBeenCalled();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.remove).toHaveBeenCalled();
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = RESPONSE_USER_MOCK.id;

      jest
        .spyOn(mockUserRepository, 'findOneBy')
        .mockRejectedValue(new NotFoundException());

      await expect(service.removeById(id)).rejects.toThrow(NotFoundException);

      expect(mockUserRepository.findOneBy).toHaveBeenCalled();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  it("getAllUsers => should return an array of modified users' data", async () => {
    const user = RESPONSE_USER_MOCK as User;
    const users = [user];
    const modifiedUserData = MODIFIED_USER_MOCK as IUserResponse;
    const modifiedUsersArray = [modifiedUserData];

    jest.spyOn(service, 'findAll').mockResolvedValue(users);

    const result = await service.getAllUsers();

    expect(service.findAll).toHaveBeenCalled();

    expect(result).toEqual(modifiedUsersArray);
  });
});
