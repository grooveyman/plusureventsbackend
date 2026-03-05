import { PartialType } from '@nestjs/swagger';
import { CreateFormAccessDto } from './create-form_access.dto';

export class UpdateFormAccessDto extends PartialType(CreateFormAccessDto) {}
