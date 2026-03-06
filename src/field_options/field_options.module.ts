import { Module } from '@nestjs/common';
import { FieldOptionsService } from './field_options.service';
import { FieldOptionsController } from './field_options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldOption } from './entities/field_option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FieldOption])
  ],
  controllers: [FieldOptionsController],
  providers: [FieldOptionsService],
  exports: [FieldOptionsService]
})
export class FieldOptionsModule {}
