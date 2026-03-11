import { Module } from '@nestjs/common';
import { AttendeeGroupService } from './attendee_group.service';
import { AttendeeGroupController } from './attendee_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeeGroup } from './entities/attendee_group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendeeGroup])
  ],
  controllers: [AttendeeGroupController],
  providers: [AttendeeGroupService],
})
export class AttendeeGroupModule {}
