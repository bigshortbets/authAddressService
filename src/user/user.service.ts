import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { convertEVMtoSubstrateAddress } from '../utils/utils';
import { UserResDto } from './dto/userRes.dto';

@Injectable()
export class UserService {
  private readonly SERVICE = 'UserService';
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {
    this.logger.verbose(`Creating UserService`, this.SERVICE);
  }

  async convertAndSave(ethAddress: string): Promise<UserResDto | {}> {
    try {
      const existingUser = await this.prisma.addressRecord.findUnique({
        where: {
          ethAddress: ethAddress,
        },
      });

      if (existingUser) {
        return existingUser;
      }

      const ss58Address = convertEVMtoSubstrateAddress(ethAddress);

      const user = await this.prisma.addressRecord.create({
        data: {
          ethAddress,
          ss58Address,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to create record: ${error.message}`);
    }
  }

  async getRecordByEthAddress(ethAddress: string): Promise<UserResDto | {}> {
    try {
      const user = await this.prisma.addressRecord.findUnique({
        where: { ethAddress },
      });

      if (!user) {
        return {};
      }

      return user;
    } catch (error) {
      throw new Error(
        `Failed to retrieve record by Ethereum address: ${error.message}`,
      );
    }
  }

  async getRecordBySubstrateAddress(
    ss58Address: string,
  ): Promise<UserResDto | {}> {
    try {
      const user = await this.prisma.addressRecord.findUnique({
        where: { ss58Address },
      });

      if (!user) {
        return {};
      }

      return user;
    } catch (error) {
      throw new Error(
        `Failed to retrieve record by Substrate address: ${error.message}`,
      );
    }
  }
}
