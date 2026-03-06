import { Inject, Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { FieldOptionsService } from '../field_options/field_options.service';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly fieldOptionService: FieldOptionsService
  ) { }

  async create(createFieldDto: CreateFieldDto[]) {
    
    for (const fields of createFieldDto) {
      
      const field = this.fieldRepository.create({
        label: fields.label,
        field_type: fields.field_type,
        is_required: fields.isRequired,
        event: { id: fields.event.id }
      });
      
      const savedField = await this.fieldRepository.save(field);
      this.logger.log("info", `Field with label: ${savedField.label} created`);
     
      //save field options if any
      if (fields.fieldOptions && fields.fieldOptions.length !== 0) {
        for (const options of fields.fieldOptions) {
          const option = await this.fieldOptionService.create({
            label: options.label,
            option_value: options.option_value,
            field_id: savedField.id
          });
          this.logger.log("info", `Field option with label ${option.label} created`);
        }
      }

    }

    return `Form fields with label created successfully`;
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
