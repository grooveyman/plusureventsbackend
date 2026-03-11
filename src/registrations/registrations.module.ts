import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../events/events.module';
import { FieldsModule } from '../fields/fields.module';
import { Event } from '../events/entities/event.entity';
import { Field } from '../fields/entities/field.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Registration, Event, Field]),
    AuthModule
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
