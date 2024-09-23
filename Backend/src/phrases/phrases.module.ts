import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';

@Module({
  controllers: [PhrasesController],
  providers: [PhrasesService]
})
export class PhrasesModule {}
