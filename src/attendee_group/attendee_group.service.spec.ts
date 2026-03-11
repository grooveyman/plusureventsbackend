import { Test, TestingModule } from '@nestjs/testing';
import { AttendeeGroupService } from './attendee_group.service';

describe('AttendeeGroupService', () => {
  let service: AttendeeGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendeeGroupService],
    }).compile();

    service = module.get<AttendeeGroupService>(AttendeeGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
