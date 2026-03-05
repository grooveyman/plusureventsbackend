import { Injectable } from '@nestjs/common';
import { CreateFormAccessDto } from './dto/create-form_access.dto';
import { UpdateFormAccessDto } from './dto/update-form_access.dto';

@Injectable()
export class FormAccessService {
  create(createFormAccessDto: CreateFormAccessDto) {
    return 'This action adds a new formAccess';
  }

  findAll() {
    return `This action returns all formAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formAccess`;
  }

  update(id: number, updateFormAccessDto: UpdateFormAccessDto) {
    return `This action updates a #${id} formAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} formAccess`;
  }
}
