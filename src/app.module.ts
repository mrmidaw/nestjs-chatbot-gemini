import { Module } from "@nestjs/common";
import { GeminiGptModule } from "./gemini-gpt/geminiGpt.module";
import { TelegramModule } from "./telegram/telegram.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), GeminiGptModule, TelegramModule],
})
export class AppModule {}
