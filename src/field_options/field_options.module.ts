import { Module } from '@nestjs/common';
import { FieldOptionsService } from './field_options.service';
import { FieldOptionsController } from './field_options.controller';

@Module({
  controllers: [FieldOptionsController],
  providers: [FieldOptionsService],
})
export class FieldOptionsModule {}
