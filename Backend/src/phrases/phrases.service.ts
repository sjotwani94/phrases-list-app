import { Injectable, NotFoundException } from '@nestjs/common';
import { Phrase, Status, Translation } from './phrases.model';

@Injectable()
export class PhrasesService {
    phrases: Phrase[] = [];

    insertPhrase(phrase: Phrase): string {
        this.phrases.push(phrase);
        return JSON.stringify(phrase);
    }

    getPhrases(): Phrase[] {
        return [...this.phrases];
    }

    getPhrase(phraseId: string): Phrase {
        return this.findPhrase(phraseId)[0];
    }

    updatePhrase(phraseId: string, phrase?: string, status?: string, translations?: Translation[]): void {
        const [phraseObject, index] = this.findPhrase(phraseId);
        const updatedPhrase = { ...phraseObject };
        if (phrase) {
            updatedPhrase.phrase = phrase;
        }
        if (status) {
            updatedPhrase.status = Status[status];
        }
        if (translations) {
            updatedPhrase.translations = translations;
        }
        this.phrases[index] = updatedPhrase;
    }

    deletePhrase(phraseId: string): void {
        const [_, index] = this.findPhrase(phraseId);
        this.phrases.splice(index, 1);
    }

    private findPhrase(phraseId: string): [Phrase, number] {
        const phraseIndex = this.phrases.findIndex((phrase) => phrase.id === phraseId);
        const phrase = this.phrases[phraseIndex];
        if (!phrase) {
            throw new NotFoundException('Could Not Find Phrase');
        }
        return [phrase, phraseIndex];
    }
}
