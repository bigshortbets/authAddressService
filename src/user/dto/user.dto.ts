import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Address of user',
    required: true,
  })
  @IsEthereumAddress()
  readonly userAddress: string;
}
