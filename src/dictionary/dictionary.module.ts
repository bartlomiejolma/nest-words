import { Module } from '@nestjs/common';

import { DictionaryService, DictionaryApi } from './dictionary.service';
import { OxfordApi } from './oxford.api';

@Module({
  providers: [
    DictionaryService,
    { provide: DictionaryApi, useClass: OxfordApi },
  ],
  exports: [DictionaryService],
})
export class DictionaryModule {}
