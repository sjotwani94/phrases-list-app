import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Phrase, Status, Translation } from './phrases.model';
import { PhrasesService } from './phrases.service';

@Controller('phrases')
export class PhrasesController {
    constructor(private readonly phrasesService: PhrasesService) {}

    @Post()
    addPhrase(@Body('phrase') phrase: string, @Body('translations') translations: Translation[]): any {
        const currentDateAndTime = new Date();
        const generatedID = this.phrasesService.insertPhrase(
            new Phrase(
                randomUUID().toString(),
                phrase,
                Status.ACTIVE,
                currentDateAndTime.toISOString(),
                currentDateAndTime.toISOString(),
                translations,
            ),
        );

        return { id: generatedID };
    }

    @Get()
    getAllPhrases(): Phrase[] {
        return this.phrasesService.getPhrases();
    }

    @Get(':id')
    getPhrase(@Param('id') phraseId: string): Phrase {
        return this.phrasesService.getPhrase(phraseId);
    }

    @Patch(':id')
    updatePhrase(
        @Param('id') phraseId: string,
        @Body('phrase') phrase?: string,
        @Body('status') status?: string,
        @Body('translations') translations?: Translation[],
    ): any {
        this.phrasesService.updatePhrase(phraseId, phrase, status, translations);
    }

    @Delete(':id')
    deletePhrase(@Param('id') phraseId: string) {
        this.phrasesService.deletePhrase(phraseId);
        return null;
    }
}
