import { Test, TestingModule } from '@nestjs/testing';
import { AttendeeGroupController } from './attendee_group.controller';
import { AttendeeGroupService } from './attendee_group.service';

describe('AttendeeGroupController', () => {
  let controller: AttendeeGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendeeGroupController],
      providers: [AttendeeGroupService],
    }).compile();

    controller = module.get<AttendeeGroupController>(AttendeeGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
