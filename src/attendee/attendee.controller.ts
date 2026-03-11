import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Sse } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import type { Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { Observable, Subject } from 'rxjs';

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register an attendee' })
  @ApiResponse({ status: 201, description: 'Attendee created successfully!' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Res() res: Response, @Body() createAttendeeDto: CreateAttendeeDto) {
    console.log(createAttendeeDto);
    try {
      return ResponseHelper.success(res, 'Attendee registered successfully', await this.attendeeService.create(createAttendeeDto));
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
      return ResponseHelper.error(res, 'Error occured: '+err.message, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('live')
  @Sse()
  @ApiOperation({ summary: 'Live stream of new attendee registrations via SSE' })
  @ApiProduces('text/event-stream')
  @ApiResponse({
    status: 200,
    description: 'SSE stream — emits a new event each time an attendee registers',
    schema: {
      example: {
        data: '{"id":1,"responses":{"1":"John Doe","2":"john@email.com"},"created_at":"2026-03-10T10:00:00.000Z"}'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  liveRegistrations(@Res() res: Response): Observable<any> {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    return this.attendeeService.getRegistrationStream();
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
