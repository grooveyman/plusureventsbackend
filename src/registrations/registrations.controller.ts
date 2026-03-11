import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Inject } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ResponseHelper } from '../helpers/response.helper';
import type { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('registrations')
export class RegistrationsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly registrationsService: RegistrationsService
  ) {}

  @Post('/register')
  async create(@Res() res: Response, @Body() createRegistrationDto: CreateRegistrationDto) {
    try{
      const result = await this.registrationsService.create(createRegistrationDto);
      if(!result.success) throw new Error("Failed to register user");
      return ResponseHelper.success(res, "Successfully registered", await this.registrationsService.create(createRegistrationDto), HttpStatus.CREATED);
    }catch(er:any){
      this.logger.error("Failed to register user "+er.message);
      return ResponseHelper.error(res, "Error creating", HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
    
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
