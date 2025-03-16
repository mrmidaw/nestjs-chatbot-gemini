import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Observable } from "rxjs";
import { Scenes, Telegraf } from "telegraf";

type ContextType = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<ContextType> {
    accessTgUserName = "mrmidaw";
    accessSecondTgUserName = "vadim_gavr";
    forbiddingString = "Hi, this bot is not for you...";
    yourTgString = "Your telegram username";

    @Start()
    async onStart(@Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
            return;
        }

        await ctx.reply(`Привет в чате mrmidaw с GeminiGPT!`);
        await ctx.reply(`${this.yourTgString}: ${userName}`);
    }

    @On("text")
    async onMessage(@Message("text") text: string, @Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
            return;
        }

        await ctx.reply(`Привет в чате mrmidaw с GeminiGPT!`);
        await ctx.reply(`${this.yourTgString}: ${userName}`);

        // return this.gpt.generateResponse(text);
    }

    @On("voice")
    async onVoiceMessage(@Ctx() ctx: ContextType) {
        const userName = ctx.from?.username;

        if (userName !== this.accessTgUserName) {
            await ctx.reply(`${this.yourTgString}: ${userName}`);
            await ctx.reply(this.forbiddingString);
            return;
        }
    }
}
