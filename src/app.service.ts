import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger){}
  getHello(): string {
    this.logger.log(`Server is live!`, AppService.name);
    return 'Server is live';
  }
}
