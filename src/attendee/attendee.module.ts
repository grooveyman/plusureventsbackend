import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendee]), MailModule],
  controllers: [AttendeeController],
  providers: [AttendeeService],
})
export class AttendeeModule {}
