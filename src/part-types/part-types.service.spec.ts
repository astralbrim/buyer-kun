import { Test, TestingModule } from '@nestjs/testing';
import { PartTypesService } from './part-types.service';

describe('PartTypesService', () => {
  let service: PartTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartTypesService],
    }).compile();

    service = module.get<PartTypesService>(PartTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
