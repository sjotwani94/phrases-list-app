import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phrase, Status, Translation } from './phrases.model';

@Injectable()
export class PhrasesService {
    constructor(@InjectModel('phrase') private readonly phraseModel: Model<Phrase>) {}

    async insertPhrase(phrase?: string, translations?: Translation[]): Promise<string> {
        const currentDateAndTime = new Date();
        const newPhrase = new this.phraseModel({
            phrase,
            status: Status.ACTIVE,
            createdAt: currentDateAndTime.toISOString(),
            updatedAt: currentDateAndTime.toISOString(),
            translations,
        });
        const result = await newPhrase.save();
        console.log(result);
        return result.id;
    }

    async getPhrases(): Promise<Phrase[]> {
        const phrases = await this.phraseModel.find().exec();
        return phrases.map((phrase) => ({
            id: phrase.id,
            phrase: phrase.phrase,
            status: phrase.status,
            createdAt: phrase.createdAt,
            updatedAt: phrase.updatedAt,
            translations: phrase.translations,
        })) as Phrase[];
    }

    async getPhrasesBasedOnSearchQuery(searchQuery: string): Promise<Phrase[]> {
        const phrases = await this.phraseModel.find().exec();
        const filteredPhrases = phrases.filter((phrase) => phrase.phrase.includes(searchQuery));
        return filteredPhrases.map((phrase) => ({
            id: phrase.id,
            phrase: phrase.phrase,
            status: phrase.status,
            createdAt: phrase.createdAt,
            updatedAt: phrase.updatedAt,
            translations: phrase.translations,
        })) as Phrase[];
    }

    async getPhrase(phraseId: string): Promise<Phrase> {
        const phrase = await this.findPhrase(phraseId);
        return {
            id: phrase.id,
            phrase: phrase.phrase,
            status: phrase.status,
            createdAt: phrase.createdAt,
            updatedAt: phrase.updatedAt,
        } as Phrase;
    }

    async getPhraseTranslation(phraseId: string, language: string): Promise<string> {
        const phrase = await this.findPhrase(phraseId);
        let translationString = '';
        phrase.translations.forEach((translation) => {
            Object.entries(translation).forEach(([key, value]) => {
                console.log(`Language: ${key}, Translation: ${value}`);
                if (key === language) {
                    translationString = value;
                }
            });
        });
        return translationString;
    }

    async updatePhrase(
        phraseId: string,
        phrase?: string,
        status?: string,
        translations?: Translation[],
    ): Promise<string> {
        const updatedPhrase = await this.findPhrase(phraseId);
        if (phrase) {
            updatedPhrase.phrase = phrase;
        }
        if (Object.values(Status).includes(status as Status)) {
            updatedPhrase.status = status as Status;
        }
        if (translations) {
            updatedPhrase.translations = translations;
        }
        console.log('Updated Phrase: ', updatedPhrase);

        updatedPhrase.updatedAt = new Date().toISOString();
        updatedPhrase.save();
        return updatedPhrase.id;
    }

    async deletePhrase(phraseId: string): Promise<void> {
        const result = await this.phraseModel.deleteOne({ _id: phraseId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could Not Find Phrase');
        }
    }

    private async findPhrase(phraseId: string): Promise<Phrase> {
        let phrase;
        try {
            phrase = await this.phraseModel.findById(phraseId).exec();
        } catch (error) {
            throw new NotFoundException('Could Not Find Phrase');
        }
        if (!phrase) {
            throw new NotFoundException('Could Not Find Phrase');
        }
        return phrase;
    }
}
