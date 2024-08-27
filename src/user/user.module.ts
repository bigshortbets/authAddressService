import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { EthAddressValidationMiddleware } from '../middleware/eth-address-validation.middleware';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyMiddleware } from '../middleware/api-key';

@Module({
  imports: [ConfigModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes({ path: 'user/login', method: RequestMethod.POST });
    consumer
      .apply(EthAddressValidationMiddleware)
      .forRoutes(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/eth/:ethAddress', method: RequestMethod.GET },
      );
  }
}
