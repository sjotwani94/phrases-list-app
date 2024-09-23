import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesService } from './phrases.service';

describe('PhrasesService', () => {
  let service: PhrasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhrasesService],
    }).compile();

    service = module.get<PhrasesService>(PhrasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
