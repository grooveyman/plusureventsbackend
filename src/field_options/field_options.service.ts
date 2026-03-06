import { Injectable } from '@nestjs/common';
import { CreateFieldOptionDto } from './dto/create-field_option.dto';
import { UpdateFieldOptionDto } from './dto/update-field_option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldOption } from './entities/field_option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldOptionsService {
  constructor(@InjectRepository(FieldOption) private readonly fieldOptionRespository: Repository<FieldOption>) {

  }
  async create(createFieldOptionDto: CreateFieldOptionDto) {
    const fieldOption = this.fieldOptionRespository.create({
      label: createFieldOptionDto.label,
      option_value: createFieldOptionDto.option_value,
      field: {id:createFieldOptionDto.field_id}
    });

    return await this.fieldOptionRespository.save(fieldOption);
  }

  findAll() {
    return `This action returns all fieldOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldOption`;
  }

  update(id: number, updateFieldOptionDto: UpdateFieldOptionDto) {
    return `This action updates a #${id} fieldOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldOption`;
  }
}
