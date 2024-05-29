import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import {
  REQUEST_PRODUCT_MOCK,
  RESPONSE_PRODUCT_MOCK,
} from 'src/utils/consts/mockup';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    const createUserDto = REQUEST_PRODUCT_MOCK as CreateProductDto;
    const product = RESPONSE_PRODUCT_MOCK as Product;

    jest.spyOn(mockProductService, 'create').mockReturnValue(product);

    const result = await controller.create(createUserDto);

    expect(mockProductService.create).toHaveBeenCalled();
    expect(mockProductService.create).toHaveBeenCalledWith(createUserDto);

    expect(result).toEqual(product);
  });

  it('findAll => should return an array of user', async () => {
    const product = RESPONSE_PRODUCT_MOCK as Product;
    const products = [product];

    jest.spyOn(mockProductService, 'findAll').mockReturnValue(products);

    const result = await controller.findAll();

    expect(result).toEqual(products);
    expect(mockProductService.findAll).toHaveBeenCalled();
  });

  describe('findOne', () => {
    it('should find a user by a given id and return its data', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK as Product;

      jest.spyOn(mockProductService, 'findOneById').mockReturnValue(product);

      const result = await controller.findOne(id);

      expect(mockProductService.findOneById).toHaveBeenCalled();
      expect(mockProductService.findOneById).toHaveBeenCalledWith(id);
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;

      jest
        .spyOn(mockProductService, 'findOneById')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);

      expect(mockProductService.findOneById).toHaveBeenCalled();
      expect(mockProductService.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update and return a updated product', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK;
      const updateProductDto = { price: 1600 } as UpdateProductDto;
      const updatedProduct = { ...product, ...updateProductDto };

      jest
        .spyOn(mockProductService, 'update')
        .mockResolvedValue(updatedProduct);

      const result = await controller.update(id, updateProductDto);

      expect(mockProductService.update).toHaveBeenCalled();
      expect(mockProductService.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );

      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const updateProductDto = { price: 1600 } as UpdateProductDto;

      jest
        .spyOn(mockProductService, 'update')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockProductService.update).toHaveBeenCalled();
      expect(mockProductService.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove and return a removed product', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK;

      jest.spyOn(mockProductService, 'remove').mockReturnValue(product);

      const result = await controller.remove(id);

      expect(mockProductService.remove).toHaveBeenCalled();
      expect(mockProductService.remove).toHaveBeenCalledWith(id);

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;

      jest
        .spyOn(mockProductService, 'remove')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);

      expect(mockProductService.remove).toHaveBeenCalled();
      expect(mockProductService.remove).toHaveBeenCalledWith(id);
    });
  });
});
