import { PartialType } from '@nestjs/swagger';
import { CreateFieldOptionDto } from './create-field_option.dto';

export class UpdateFieldOptionDto extends PartialType(CreateFieldOptionDto) {}
