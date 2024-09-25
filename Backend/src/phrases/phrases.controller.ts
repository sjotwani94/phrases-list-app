import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Phrase, Translation } from './phrases.model';
import { PhrasesService } from './phrases.service';

@Controller('phrases')
export class PhrasesController {
    constructor(private readonly phrasesService: PhrasesService) {}

    @Post()
    async addPhrase(@Body('phrase') phrase: string, @Body('translations') translations: Translation[]): Promise<any> {
        const generatedID = await this.phrasesService.insertPhrase(phrase, translations);
        return { id: generatedID };
    }

    @Get()
    async getAllPhrases(): Promise<Phrase[]> {
        const phrases = this.phrasesService.getPhrases();
        return phrases;
    }

    @Get('search')
    async getPhrasesOnSearchQuery(@Query('query') query: string): Promise<Phrase[]> {
        const phrases = this.phrasesService.getPhrasesBasedOnSearchQuery(query);
        return phrases;
    }

    @Get(':id')
    async getPhrase(@Param('id') phraseId: string): Promise<Phrase> {
        const phrase = this.phrasesService.getPhrase(phraseId);
        return phrase;
    }

    @Get(':id/:language')
    async getPhraseTranslation(@Param('id') phraseId: string, @Param('language') language: string): Promise<string> {
        const phrase = this.phrasesService.getPhraseTranslation(phraseId, language);
        return phrase;
    }

    @Patch(':id')
    async updatePhrase(
        @Param('id') phraseId: string,
        @Body('phrase') phrase?: string,
        @Body('status') status?: string,
        @Body('translations') translations?: Translation[],
    ): Promise<any> {
        const updatedID = await this.phrasesService.updatePhrase(phraseId, phrase, status, translations);
        return { id: updatedID };
    }

    @Delete(':id')
    async deletePhrase(@Param('id') phraseId: string) {
        await this.phrasesService.deletePhrase(phraseId);
        return null;
    }
}
