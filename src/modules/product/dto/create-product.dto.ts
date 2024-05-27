import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString, Max, MaxLength } from 'class-validator';
import { DataLimitation } from 'src/utils/consts/DataLimitation';
import { ValidationMessage } from 'src/utils/consts';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    example: 'iPhone 15 PRO MAX',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @MaxLength(DataLimitation.TITLE, {
    message: `${ValidationMessage.MAX_LENGTH} ${DataLimitation.TITLE}`,
  })
  title: string;

  @ApiProperty({
    description: 'Product description',
    example:
      'Mobile device that combines an iPod music and video player, mobile phone and Internet browser capability',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @MaxLength(DataLimitation.DESCR, {
    message: `${ValidationMessage.MAX_LENGTH} ${DataLimitation.DESCR}`,
  })
  description: string;

  @ApiProperty({
    description: 'Product description',
    example: '1500',
  })
  @IsPositive({ message: ValidationMessage.IS_NUMBER })
  @Max(DataLimitation.PRICE, {
    message: `${ValidationMessage.MIN_NUM} ${DataLimitation.PRICE}`,
  })
  price: number;

  @ApiProperty({
    description: 'Product category',
    example: 'Smartphones',
  })
  @IsString({ message: ValidationMessage.IS_STRING })
  @MaxLength(DataLimitation.DESCR, {
    message: `${ValidationMessage.MAX_LENGTH} ${DataLimitation.DESCR}`,
  })
  category: string;
}
