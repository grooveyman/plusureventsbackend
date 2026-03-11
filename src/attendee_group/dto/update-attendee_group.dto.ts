import { PartialType } from '@nestjs/swagger';
import { CreateAttendeeGroupDto } from './create-attendee_group.dto';

export class UpdateAttendeeGroupDto extends PartialType(CreateAttendeeGroupDto) {}
