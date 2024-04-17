import { Module } from '@nestjs/common';
import { CatalistService } from './catalist.service';

@Module({
  providers: [CatalistService],
  exports: [CatalistService],
})
export class CatalistModule {}
