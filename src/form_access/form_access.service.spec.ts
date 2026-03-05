import { Test, TestingModule } from '@nestjs/testing';
import { FormAccessService } from './form_access.service';

describe('FormAccessService', () => {
  let service: FormAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormAccessService],
    }).compile();

    service = module.get<FormAccessService>(FormAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
