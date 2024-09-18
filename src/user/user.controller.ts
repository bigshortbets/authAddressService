import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger';
import { LoginDto } from './dto/user.dto';
import { UserResDto } from './dto/userRes.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({
    required: true,
    description: 'Body with the Ethereum address of the user',
    type: LoginDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully logged in and saved.',
    type: UserResDto,
  })
  @ApiSecurity('x-api-key')
  async login(@Body() body: LoginDto): Promise<UserResDto | {}> {
    return this.userService.convertAndSave(body.userAddress);
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'User record retrieved successfully.',
    type: Array<UserResDto>,
  })
  async getAllRecords(): Promise<UserResDto[]> {
    return this.userService.getAllRecords();
  }

  @Get('eth/:ethAddress')
  @ApiParam({
    name: 'ethAddress',
    required: true,
    description: 'The Ethereum address of the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User record retrieved successfully.',
    type: UserResDto,
  })
  async getRecordByEthAddress(
    @Param('ethAddress') ethAddress: string,
  ): Promise<UserResDto | {}> {
    return this.userService.getRecordByEthAddress(ethAddress);
  }

  @Get('ss58/:substrateAddress')
  @ApiParam({
    name: 'substrateAddress',
    required: true,
    description: 'The Substrate address of the user',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User record retrieved successfully.',
    type: UserResDto,
  })
  async getRecordBySubstrateAddress(
    @Param('substrateAddress') ethAddress: string,
  ): Promise<UserResDto | {}> {
    return this.userService.getRecordBySubstrateAddress(ethAddress);
  }
}
