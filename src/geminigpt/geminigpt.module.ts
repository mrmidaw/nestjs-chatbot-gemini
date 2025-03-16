import { Module } from '@nestjs/common';
import { GeminigptService } from './geminigpt.service';

@Module({
  providers: [GeminigptService]
})
export class GeminigptModule {}
