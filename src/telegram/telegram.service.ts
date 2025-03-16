import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Scenes, Telegraf } from "telegraf";
import Gemini, { ChatAskOptions } from "gemini-ai";
import { env } from "process";

type ContextType = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<ContextType> {
    accessTgUserName = env.FIRST_ACCESS_RIGHTS_USER_NAME;
    accessSecondTgUserName = env.SECOND_ACCESS_RIGHTS_USER_NAME;
    forbiddingString = "Hi, this bot is not for you...";
    yourTgString = "Your telegram username";
    previousAnswers: Partial<ChatAskOptions<"text">>;

    @Start()
    async onStart(@Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName && userName !== this.accessSecondTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
        }

        await ctx.reply(`Привет в чате mrmidaw с GeminiGPT!`);
        await ctx.reply(`${this.yourTgString}: ${userName}`);
    }

    @On("text")
    async onMessage(@Message("text") text: string, @Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName && userName !== this.accessSecondTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
            return;
        }

        ctx.reply("Пожалуйста, подождите немного, пока чат-бот обрабатывает ваш запрос . . .");

        const gemini = new Gemini(env.GPT_API ?? "");

        const chat = gemini.createChat();

        const answer = await chat.ask(text);

        return answer;
    }

    @On("voice")
    async onVoiceMessage(@Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName && userName !== this.accessSecondTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
            return;
        }
    }
}
