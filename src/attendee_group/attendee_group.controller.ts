import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Inject, Sse, MessageEvent } from '@nestjs/common';
import { AttendeeGroupService } from './attendee_group.service';
import { CreateAttendeeGroupDto } from './dto/create-attendee_group.dto';
import { UpdateAttendeeGroupDto } from './dto/update-attendee_group.dto';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@ApiTags('Attendees Group')
@Controller('attendee-group')
export class AttendeeGroupController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly attendeeGroupService: AttendeeGroupService
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register group attendee' })
  @ApiResponse({ status: 201, description: 'Registered group attendance successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Res() res: Response, @Body() createAttendeeGroupDto: CreateAttendeeGroupDto) {
    console.log("...saving group");
    try {

      const result = await this.attendeeGroupService.create(createAttendeeGroupDto);
      if (!result.success) throw new Error(`Error: something happened`);
      this.logger.log('Registered group attendance successfully', result);
      return ResponseHelper.success(res, 'Registered group attendance successfully', result);
    } catch (err: any) {
      this.logger.error(`Failed to register group attendees: ${err.message}`);
      ResponseHelper.error(res, 'Failed to register group attendee', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
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
    return this.attendeeGroupService.getRegistrationStream();
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const result = await this.attendeeGroupService.findAll();
      if (!result || result.length === 0) {
        return ResponseHelper.notFound(res);
      }
      return ResponseHelper.success(res, 'Attendee group registered succesfully', result);

    } catch (err: any) {
      return ResponseHelper.error(res, 'Error retrieving all attendee groups', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    return
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendeeGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendeeGroupDto: UpdateAttendeeGroupDto) {
    return this.attendeeGroupService.update(+id, updateAttendeeGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendeeGroupService.remove(+id);
  }
}
