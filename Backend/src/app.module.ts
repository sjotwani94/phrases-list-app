import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhrasesModule } from './phrases/phrases.module';

@Module({
  imports: [PhrasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
