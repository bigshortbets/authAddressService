import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly validApiKey = process.env.API_KEY; // Store your API key in environment variables

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== this.validApiKey) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    next();
  }
}
