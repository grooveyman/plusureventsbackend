import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import type { Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) { }

  @Post()
  async create(@Res() res: Response, @Body() createAttendeeDto: CreateAttendeeDto) {
    try {
      return ResponseHelper.success(res, 'Attendee created successfully', await this.attendeeService.create(createAttendeeDto));
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error occured", error: err.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const result = await this.attendeeService.findAll();
      if (!result || result.length === 0) {
        return ResponseHelper.notFound(res);
      }
      return ResponseHelper.success(res, 'Attendees retrived successfully', result);
    } catch (err: any) {
      return ResponseHelper.error(res, 'Error occured', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendeeDto: UpdateAttendeeDto) {
    return this.attendeeService.update(+id, updateAttendeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendeeService.remove(+id);
  }
}
