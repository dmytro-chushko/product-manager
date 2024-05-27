import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({
    description: 'Product ID',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Product title',
    example: 'iPhone',
  })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({
    description: 'Product description',
    example:
      'Mobile device that combines an iPod music and video player, mobile phone and Internet browser capability',
  })
  @Column({ length: 1000 })
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: '1500',
  })
  @Column({ width: 999999 })
  price: number;

  @ApiProperty({
    description: 'Product category',
    example: 'Smartphones',
  })
  @Column({ length: 100 })
  category: string;

  @ApiProperty({
    description: 'Date of creation',
    example: '2024-05-26T07:00:25.851Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of updating',
    example: '2024-05-26T07:00:25.851Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
