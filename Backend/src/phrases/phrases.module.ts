import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhrasesController } from './phrases.controller';
import { PhraseSchema } from './phrases.model';
import { PhrasesService } from './phrases.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'phrase', schema: PhraseSchema }])],
    controllers: [PhrasesController],
    providers: [PhrasesService],
})
export class PhrasesModule {}
