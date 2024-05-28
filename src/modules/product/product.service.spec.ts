import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

const REQUEST_PRODUCT_MOCK = {
  title: 'iPhone',
  description:
    'Mobile device that combines an iPod music and video player, mobile phone and Internet browser capability',
  price: 1500,
  category: 'Smartphones',
};

const RESPONSE_PRODUCT_MOCK = {
  id: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  title: 'iPhone',
  description:
    'Mobile device that combines an iPod music and video player, mobile phone and Internet browser capability',
  price: 1500,
  category: 'Smartphones',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const VALID_ID = '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e';
const INVALID_ID = '086dcaf4-c1ea-4218-b6b4-e4fd95a3c28e';

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

  it('findOneById => should find a user by a given id and return its data', async () => {
    const id = VALID_ID;
    const product = RESPONSE_PRODUCT_MOCK as Product;

    jest.spyOn(mockProductRepository, 'findOneBy').mockReturnValue(product);

    const result = await service.findOneById(id);

    expect(mockProductRepository.findOneBy).toHaveBeenCalled();
    expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({ id });
    expect(result).toEqual(product);
  });
});
