import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';

@Injectable()
export class EthAddressValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ethAddress = req.body.ethAddress || req.params.ethAddress;

    if (!ethAddress || !ethers.isAddress(ethAddress)) {
      throw new BadRequestException('Invalid Ethereum address');
    }

    next();
  }
}
