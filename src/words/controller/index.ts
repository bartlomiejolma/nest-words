import { Controller, Get, Post, Body } from '@nestjs/common';

import { WordsService } from '../service';
import { CreateWordDto } from '../dtos/create-word.dto';
import { Word } from '../word';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  getWords(): Promise<Word[]> {
    return this.wordsService.getWords();
  }

  @Post()
  async addWords(@Body() createWordDTO: CreateWordDto) {
    return await this.wordsService.addWord(createWordDTO);
  }
}
