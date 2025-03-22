import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Scenes, Telegraf } from "telegraf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "process";

type ContextType = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<ContextType> {
    accessTgUserId = env.FIRST_ACCESS_RIGHTS_USER_ID;
    accessSecondTgUserId = env.SECOND_ACCESS_RIGHTS_USER_ID;
    forbiddingString = "Hi, this bot is not for you...";
    yourTgAnswer = "Your telegram ID";
    errorResponse = "Something went wrong. Try again later";

    @Start()
    async onStart(@Ctx() ctx: ContextType) {
        const userId = String(ctx.from?.id);

        if (userId !== this.accessTgUserId && userId !== this.accessSecondTgUserId) {
            await ctx.reply(`${this.yourTgAnswer}: ${userId}`);
            await ctx.reply(this.forbiddingString);
            return;
        }

        await ctx.reply(`Привет в чате mrmidaw с GeminiGPT!`);
        await ctx.reply(`${this.yourTgAnswer}: ${userId}`);
    }

    @On("text")
    async onMessage(@Message("text") text: string, @Ctx() ctx: ContextType) {
        const userId = String(ctx.from?.id);

        if (userId !== this.accessTgUserId && userId !== this.accessSecondTgUserId) {
            await ctx.reply(`${this.yourTgAnswer}: ${userId}`);
            await ctx.reply(this.forbiddingString);
            return;
        }

        ctx.reply(`Пожалуйста, подождите немного, пока чат-бот обрабатывает ваш запрос...`);

        let prevQuestions: string = "";

        const genAI = new GoogleGenerativeAI(env.GPT_API ?? "");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const requestWithPrevValue = prevQuestions + text;

        const result = await model.generateContent(requestWithPrevValue);
        const aiResponse = result.response.text() ?? this.errorResponse;

        const saveQuestionAndResult = `Вопрос: ${text} - Ответ: ${aiResponse},`;

        prevQuestions += saveQuestionAndResult;

        console.log("🚀 ~ TelegramService ~ onMessage ~ prevQuestions>>>", prevQuestions);

        return aiResponse;
    }

    @On("voice")
    async onVoiceMessage(@Ctx() ctx: ContextType) {
        const userId = String(ctx.from?.id);

        if (userId !== this.accessTgUserId && userId !== this.accessSecondTgUserId) {
            await ctx.reply(`${this.yourTgAnswer}: ${userId}`);
            await ctx.reply(this.forbiddingString);
            return;
        }
    }
}
