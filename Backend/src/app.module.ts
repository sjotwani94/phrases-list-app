import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhrasesModule } from './phrases/phrases.module';

@Module({
    imports: [
        PhrasesModule,
        MongooseModule.forRoot(
            'mongodb+srv://siddharthjotwani:HYHoBNNOgJe0uU6O@phrasescluster.3n1d6.mongodb.net/listOfPhrases?retryWrites=true&w=majority&appName=PhrasesCluster',
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
