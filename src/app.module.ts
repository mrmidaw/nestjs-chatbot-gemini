import { Module } from '@nestjs/common';
import { GeminigptModule } from './geminigpt/geminigpt.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [GeminigptModule, TelegramModule],
})
export class AppModule {}
