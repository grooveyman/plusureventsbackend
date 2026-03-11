import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { Field } from '../fields/entities/field.entity';
import { error } from 'console';

@Injectable()
export class RegistrationsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Registration) private readonly registrationRepository: Repository<Registration>, @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(Field) private readonly fieldRepository: Repository<Field>
  ){

  }
  async create(createRegistrationDto: CreateRegistrationDto) {
    const { event_id, responses } = createRegistrationDto;
    //check if event exists
    const event = await this.eventRepository.findOne({ where: {id: event_id}});
    if(!event) throw new NotFoundException('EVent not found');

    //load fields for event
    const fields = await this.fieldRepository.find({
      where: {event:{id: event_id}},
      relations:['field_options']
    });

    if(!fields.length) throw new BadRequestException('This event has no form fields defined');

    //validate responses against fields
    const errors: string[] = [];

    for(const field of fields){
      const value = responses[field.id.toString()];
      if(field.is_required && (!value || !value.trim())){
        errors.push(`"${field.label}" is required`);
        continue;
      }

      if(!value) continue;

      //validate select/radio against options
      if(['select', 'radio'].includes(field.field_type)){
        const valid = field.field_options.map((o) => o.option_value);
        if(!valid.includes(value)){
          errors.push(`"${field.label}" must be one of: ${valid.join(', ')}`);
        }
      }
    }

    if(errors.length > 0) throw new BadRequestException({message:'Validation failed', errors});
    //save registration

    const registration = this.registrationRepository.create({
      event: {id:event_id} as Event,
      responses
    });

    const savedRegistration = await this.registrationRepository.save(registration);

    return {success:true, data:savedRegistration};
  }

  findAll() {
    return `This action returns all registrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
