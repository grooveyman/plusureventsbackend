import { Module } from '@nestjs/common';
import { FormAccessService } from './form_access.service';
import { FormAccessController } from './form_access.controller';

@Module({
  controllers: [FormAccessController],
  providers: [FormAccessService],
})
export class FormAccessModule {}
