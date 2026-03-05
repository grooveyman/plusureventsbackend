import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Like, Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ResponseHelper } from 'src/helpers/response.helper';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly mailService: MailService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) { }

  async create(createEventDto: CreateEventDto) {
    //
    //check if event exists
    const existEvent = await this.findByName(createEventDto.name);
    if (existEvent) {
      return "Event exists already!";
    }

    //create event
    const event = this.eventRepository.create({
      name: createEventDto.name,
      location: createEventDto.location,
      description: createEventDto.description,
      hasGroup: createEventDto.group,
      start_date: createEventDto.start_date,
      end_date: createEventDto.end_date,
      expiry_date: createEventDto.expiry,
      expect_attendees: createEventDto.no_attendee,
      user: { id: createEventDto.user.id }
    });

    return await this.eventRepository.save(event);;
  }



  async findByName(name: string) {
    return await this.eventRepository.findOneBy({ name: Like(`%${name}%`), });
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }


  async uploadProfilePicture(file: Express.Multer.File, eventId: number, res: Response) {
    try {
      if (!file) {
        return ResponseHelper.error(res, 'No file provided', HttpStatus.BAD_REQUEST);
      }

      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      if (!event) {
        return ResponseHelper.error(res, 'event not found', HttpStatus.NOT_FOUND);
      }

      // delete old profile picture if exists
      if (event.flyerPublicId) {
        await this.cloudinaryService.deleteImage(event.flyerPublicId);
      }

      // upload new image
      const result = await this.cloudinaryService.uploadImage(file, 'profile-pictures');

      // save url to user
      event.flyer = result.secure_url;
      event.flyerPublicId = result.public_id;
      await this.eventRepository.save(event);

      return ResponseHelper.success(res, 'Profile picture uploaded successfully', {
        profilePicture: result.secure_url,
      });
    } catch (err) {
      return ResponseHelper.error(res, 'Upload failed', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
