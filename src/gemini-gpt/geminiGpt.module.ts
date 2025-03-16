import { Module } from "@nestjs/common";
import { GeminiGptService } from "./geminiGpt.service";

@Module({
    providers: [GeminiGptService],
    exports: [GeminiGptService],
})
export class GeminiGptModule {}
