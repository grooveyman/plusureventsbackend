import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, Req, HttpStatus, Inject } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseHelper } from '../helpers/response.helper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

  @Post("create")
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Res() res, @Body() createEventDto: CreateEventDto) {
    try {
      return ResponseHelper.success(res, "Event created successfully", await this.eventsService.create(createEventDto), HttpStatus.CREATED);
    } catch (err: any) {
      this.logger.error('Failed to create event: ' + err.message);
      ResponseHelper.error(res, "Failed to create event: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search/:search')
  async findAll(@Res() res, @Param('search') searchkey: string|number) {
    try {
      return ResponseHelper.success(res, "Event retrieved successfully", await this.eventsService.findAll(searchkey), HttpStatus.OK);
    } catch (err: any) {
      this.logger.error('Failed to retrieve event: ' + err.message);
      ResponseHelper.error(res, "Failed to retrieve event: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Post('uploadProfilePicture')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 👈 5mb limit
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return callback(new Error('Only image files are allowed'), false);
      }
      callback(null, true);
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadProfilePicture(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return await this.eventsService.uploadProfilePicture(file, +id, res);
  }
}
