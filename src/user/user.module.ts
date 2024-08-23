import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { EthAddressValidationMiddleware } from '../middleware/eth-address-validation.middleware';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EthAddressValidationMiddleware)
      .forRoutes(
        { path: 'address/convert', method: RequestMethod.POST },
        { path: 'address/eth/:ethAddress', method: RequestMethod.GET },
      );
  }
}
