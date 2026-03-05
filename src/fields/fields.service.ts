import { Inject, Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    const field = this.fieldRepository.create({
      label: createFieldDto.label,
      field_type: createFieldDto.field_type,
      is_required: createFieldDto.isRequired,
      event: {id: createFieldDto.event.id}
    });
    return 'This action adds a new field';
  }

  findAll() {
    return `This action returns all fields`;
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
