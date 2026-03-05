import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldOptionsService } from './field_options.service';
import { CreateFieldOptionDto } from './dto/create-field_option.dto';
import { UpdateFieldOptionDto } from './dto/update-field_option.dto';

@Controller('field-options')
export class FieldOptionsController {
  constructor(private readonly fieldOptionsService: FieldOptionsService) {}

  @Post()
  create(@Body() createFieldOptionDto: CreateFieldOptionDto) {
    return this.fieldOptionsService.create(createFieldOptionDto);
  }

  @Get()
  findAll() {
    return this.fieldOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldOptionDto: UpdateFieldOptionDto) {
    return this.fieldOptionsService.update(+id, updateFieldOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldOptionsService.remove(+id);
  }
}
