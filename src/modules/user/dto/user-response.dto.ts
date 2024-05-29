import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
  })
  id: string;

  @ApiProperty({
    example: 'ElonMask@gmail.com',
    description: 'User registration email',
  })
  email: string;
}
