import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  REQUEST_PRODUCT_MOCK,
  RESPONSE_PRODUCT_MOCK,
} from 'src/utils/consts/mockup';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    const createProductDto = REQUEST_PRODUCT_MOCK as CreateProductDto;

    const product = RESPONSE_PRODUCT_MOCK as Product;

    jest.spyOn(mockProductRepository, 'create').mockReturnValue(product);
    jest.spyOn(mockProductRepository, 'save').mockReturnValue(product);

    const result = await service.create(createProductDto);

    expect(mockProductRepository.create).toHaveBeenCalled();
    expect(mockProductRepository.create).toHaveBeenCalledWith(createProductDto);
    expect(mockProductRepository.save).toHaveBeenCalled();
    expect(mockProductRepository.save).toHaveBeenCalledWith(product);

    expect(result).toEqual(product);
  });

  it('findAll => should return an array of user', async () => {
    const product = RESPONSE_PRODUCT_MOCK as Product;
    const products = [product];

    jest.spyOn(mockProductRepository, 'find').mockReturnValue(products);

    const result = await service.findAll();

    expect(mockProductRepository.find).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  describe('findOneById', () => {
    it('should find a user by a given id and return its data', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK as Product;

      jest.spyOn(mockProductRepository, 'findOneBy').mockReturnValue(product);

      const result = await service.findOneById(id);

      expect(mockProductRepository.findOneBy).toHaveBeenCalled();
      expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;

      jest.spyOn(mockProductRepository, 'findOneBy').mockReturnValue(null);

      await expect(service.findOneById(id)).rejects.toThrow(NotFoundException);

      expect(mockProductRepository.findOneBy).toHaveBeenCalled();
      expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update and return a updated product', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK;
      const updateProductDto = { price: 1600 } as UpdateProductDto;
      const updatedProduct = { ...product, ...updateProductDto };

      jest.spyOn(service, 'findOneById').mockResolvedValue(product);
      jest.spyOn(mockProductRepository, 'save').mockReturnValue(updatedProduct);

      const result = await service.update(id, updateProductDto);

      expect(service.findOneById).toHaveBeenCalled();
      expect(service.findOneById).toHaveBeenCalledWith(id);
      expect(mockProductRepository.save).toHaveBeenCalled();
      expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);

      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const updateProductDto = { price: 1600 } as UpdateProductDto;

      jest
        .spyOn(service, 'findOneById')
        .mockRejectedValue(new NotFoundException());

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(service.findOneById).toHaveBeenCalled();
      expect(service.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should remove and return a removed product', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;
      const product = RESPONSE_PRODUCT_MOCK;

      jest.spyOn(service, 'findOneById').mockResolvedValue(product);
      jest.spyOn(mockProductRepository, 'remove').mockReturnValue(product);

      const result = await service.remove(id);

      expect(service.findOneById).toHaveBeenCalled();
      expect(service.findOneById).toHaveBeenCalledWith(id);
      expect(mockProductRepository.remove).toHaveBeenCalled();
      expect(mockProductRepository.remove).toHaveBeenCalledWith(product);

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const id = RESPONSE_PRODUCT_MOCK.id;

      jest
        .spyOn(service, 'findOneById')
        .mockRejectedValue(new NotFoundException());

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);

      expect(service.findOneById).toHaveBeenCalled();
      expect(service.findOneById).toHaveBeenCalledWith(id);
    });
  });
});
