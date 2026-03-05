import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Inject } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { ResponseHelper } from 'src/helpers/response.helper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) { }

  @Post("create")
  @ApiOperation({ summary: 'Create a new field' })
  @ApiResponse({ status: 201, description: 'Form field created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Res() res, @Body() createFieldDto: CreateFieldDto) {
    try {
      return ResponseHelper.success(res, 'Form fields created successfully', await this.fieldsService.create(createFieldDto));
    } catch (err: any) {
      this.logger.error("Failed to create form fields: " + err.message);
      return ResponseHelper.error(res, 'Failed to create form fields', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Get()
  findAll() {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(+id);
  }
}
