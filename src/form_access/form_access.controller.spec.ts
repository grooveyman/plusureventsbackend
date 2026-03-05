import { Test, TestingModule } from '@nestjs/testing';
import { FormAccessController } from './form_access.controller';
import { FormAccessService } from './form_access.service';

describe('FormAccessController', () => {
  let controller: FormAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAccessController],
      providers: [FormAccessService],
    }).compile();

    controller = module.get<FormAccessController>(FormAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
