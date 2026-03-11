import { Injectable, MessageEvent } from '@nestjs/common';
import { CreateAttendeeGroupDto } from './dto/create-attendee_group.dto';
import { UpdateAttendeeGroupDto } from './dto/update-attendee_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeGroup } from './entities/attendee_group.entity';
import { Repository } from 'typeorm';
import { map, Observable, Subject } from 'rxjs';

@Injectable()
export class AttendeeGroupService {
  constructor(
    @InjectRepository(AttendeeGroup) private readonly attendeeGroupRepository: Repository<AttendeeGroup>
  ) {

  }
  async create(createAttendeeGroupDto: CreateAttendeeGroupDto) {
    const exist = await this.attendeeGroupRepository.findOne({ where: { contact_person_phone: createAttendeeGroupDto.contact_person_phone } });
    if (exist) throw new Error(`Group already exists`);

    //create and save data
    const groupAttendee = this.attendeeGroupRepository.create({
      name: createAttendeeGroupDto.name,
      address: createAttendeeGroupDto.address,
      number_heads: createAttendeeGroupDto.number_heads,
      contact_person_email: createAttendeeGroupDto.contact_person_email,
      contact_person_name: createAttendeeGroupDto.contact_person_name,
      contact_person_phone: createAttendeeGroupDto.contact_person_phone
    });


    //save
    const savedGroupAttendee = await this.attendeeGroupRepository.save(groupAttendee);
    this.registrationStream$.next(savedGroupAttendee);
    return { success: true, data: savedGroupAttendee };
  }


  private registrationStream$ = new Subject<any>();
  getRegistrationStream(): Observable<MessageEvent> {
    console.log('SSE client connected');
    return this.registrationStream$.pipe(
      map((registration) => ({
        data: JSON.stringify(registration),
      }))
    );
  }

  async findAll() {
    return await this.attendeeGroupRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} attendeeGroup`;
  }

  update(id: number, updateAttendeeGroupDto: UpdateAttendeeGroupDto) {
    return `This action updates a #${id} attendeeGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendeeGroup`;
  }
}
