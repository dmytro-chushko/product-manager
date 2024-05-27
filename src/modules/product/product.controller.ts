import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiTagName } from 'src/utils/consts';
import { ProductRoute } from 'src/utils/consts/route';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiTags(ApiTagName.PRODUCT)
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
@Controller(ProductRoute.DEFAULT)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 201, type: Product })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all existing products' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @Get(ProductRoute.PARAM_ID)
  findOne(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: Product })
  @Patch(ProductRoute.PARAM_ID)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove product' })
  @ApiResponse({ status: 200, type: Product })
  @Delete(ProductRoute.PARAM_ID)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
