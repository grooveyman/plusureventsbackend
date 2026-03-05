import { Injectable } from '@nestjs/common';
import { CreateFieldOptionDto } from './dto/create-field_option.dto';
import { UpdateFieldOptionDto } from './dto/update-field_option.dto';

@Injectable()
export class FieldOptionsService {
  create(createFieldOptionDto: CreateFieldOptionDto) {
    return 'This action adds a new fieldOption';
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
