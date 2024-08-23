import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsString } from 'class-validator';

export class UserResDto {
  @ApiProperty({
    description: 'Id from DB',
    required: true,
  })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'Address of user in h160',
    required: true,
  })
  @IsEthereumAddress()
  readonly ethAddress: string;

  @ApiProperty({
    description: 'Address of user in ss58',
    required: true,
  })
  @IsString()
  readonly ss58Address: string;

  @ApiProperty({
    description: 'Created at',
    required: true,
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    required: true,
  })
  readonly updatedAt: Date;
}
