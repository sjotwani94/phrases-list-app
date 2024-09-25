import * as mongoose from 'mongoose';

export enum Status {
    ACTIVE = 'active',
    PENDING = 'pending',
    SPAM = 'spam',
    DELETED = 'deleted',
}

export class Translation {
    [language: string]: string;
}

export const PhraseSchema = new mongoose.Schema({
    phrase: String,
    status: mongoose.Schema.Types.Mixed,
    createdAt: String,
    updatedAt: String,
    translations: [mongoose.Schema.Types.Mixed],
});

export interface Phrase extends mongoose.Document {
    id: string;
    phrase: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
    translations?: Translation[];
}
