import { Module } from '@nestjs/common';
import { GeminiGptService } from './geminiGpt.service';

@Module({
  providers: [GeminiGptService],
})
export class GeminiGptModule {}
