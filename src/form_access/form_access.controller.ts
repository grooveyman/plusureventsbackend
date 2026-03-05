import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormAccessService } from './form_access.service';
import { CreateFormAccessDto } from './dto/create-form_access.dto';
import { UpdateFormAccessDto } from './dto/update-form_access.dto';

@Controller('form-access')
export class FormAccessController {
  constructor(private readonly formAccessService: FormAccessService) {}

  @Post()
  create(@Body() createFormAccessDto: CreateFormAccessDto) {
    return this.formAccessService.create(createFormAccessDto);
  }

  @Get()
  findAll() {
    return this.formAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormAccessDto: UpdateFormAccessDto) {
    return this.formAccessService.update(+id, updateFormAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formAccessService.remove(+id);
  }
}
