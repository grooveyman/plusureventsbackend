import { Inject, Injectable, MessageEvent } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { Repository } from 'typeorm';
import { Attendee } from './entities/attendee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { MailService } from '../mail/mail.service';
import { filter, map, Observable, Subject } from 'rxjs';


@Injectable()
export class AttendeeService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger, @InjectRepository(Attendee) private readonly attendeeRepository: Repository<Attendee>, private readonly mailService: MailService) {

  }
  async create(createAttendeeDto: CreateAttendeeDto) {

    //check if attendee already registered
    this.logger.log('Creating attendee', AttendeeService.name);
    if (await this.findByEmail(createAttendeeDto.email)) {
      this.logger.error('Failed to create attendee: Attendee already exists');
      throw new Error("Attendee already exists");

    }

    const attendee = this.attendeeRepository.create(createAttendeeDto);
    this.logger.log(`Registered ${createAttendeeDto.lastname} ${createAttendeeDto.firstname} successfully`, AttendeeService.name);
    //send email
    // await this.mailService.sendWelcomeEmail(attendee.email, attendee.firstname);
    const saved = await this.attendeeRepository.save(attendee);
    // console.log(saved);
    //emit to all listeners
    this.registrationStream$.next(saved);
    return saved;
  }

  private registrationStream$ = new Subject<any>();
  getRegistrationStream(): Observable<MessageEvent> {
    console.log('SSE client connected');
    return this.registrationStream$.pipe(
      map((registration) => ({
        data: JSON.stringify(registration)
      })),
    );
  }

  async findAll() {
    const users = await this.attendeeRepository.find();
    return users;
  }

  async findOne(id: number) {
    return await this.attendeeRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.attendeeRepository.findOneBy({ email });
  }


  async update(id: number, updateAttendeeDto: UpdateAttendeeDto) {
    const attendee = await this.findOne(id);
    if (!attendee) {
      throw new Error(`Attendee with id ${id} not found`);
    }
    Object.assign(attendee, updateAttendeeDto);
    return await this.attendeeRepository.save(attendee);

  }

  async remove(id: number) {
    const attendee = await this.findOne(id);
    if (!attendee) {
      throw new Error(`Attendee with id ${id} not found`);
    }
    return await this.attendeeRepository.remove(attendee);
  }
}
