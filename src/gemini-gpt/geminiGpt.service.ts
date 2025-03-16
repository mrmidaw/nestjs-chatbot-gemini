import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeminiGptService {
    private readonly logger = new Logger(GeminiGptService.name);

    constructor(private readonly configService: ConfigService) {}
}
