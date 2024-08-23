import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  healthStatus(): { status: string } {
    return { status: 'UP' };
  }

  version() {
    return {
      commit_sha: this.configService.get('VERSION_COMMIT_SHA'),
      branch: this.configService.get('VERSION_BRANCH_NAME'),
      date: this.configService.get('VERSION_BUILD_DATE'),
      environment: this.configService.get('ENV'),
    };
  }
}
