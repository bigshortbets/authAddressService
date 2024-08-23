import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthStatus(): { status: string } {
    return this.appService.healthStatus();
  }

  @Get('version')
  getVersion() {
    return this.appService.version();
  }
}
