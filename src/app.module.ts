import { Module } from '@nestjs/common';
import { WordsModule } from './words';

@Module({
  imports: [WordsModule],
})
export class AppModule {}
