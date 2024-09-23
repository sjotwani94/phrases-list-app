import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesController } from './phrases.controller';

describe('PhrasesController', () => {
  let controller: PhrasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhrasesController],
    }).compile();

    controller = module.get<PhrasesController>(PhrasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
