export class Phrase {
    constructor(
        public id: string,
        public phrase: string,
        public status: Status,
        public createdAt: string,
        public updatedAt: string,
        public translations: Translation[],
    ) {}
}

export enum Status {
    ACTIVE = 'active',
    PENDING = 'pending',
    SPAM = 'spam',
    DELETED = 'deleted',
}

export class Translation {
    [language: string]: string;
}
