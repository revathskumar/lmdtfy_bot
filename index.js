'use strict'

const Telegram = require('telegram-node-bot')

const TelegramBaseInlineQueryController = Telegram.TelegramBaseInlineQueryController
const tg = new Telegram.Telegram(process.env.TELEGRAM_BOT_TOKEN, {
    workers: 1,
    webhook: {
        url: process.env.WEBHOOK_URL,
        port: process.env.WEBHOOK_PORT || 3000,
        host: process.env.WEBHOOK_HOST || 'localhost'
    }
})

class DuckController extends TelegramBaseInlineQueryController {
    handle($) {
        const query = $._inlineQuery.query;
        let results = [];
        if (query) {
            results = [{
                id: Math.random().toString(36).substring(7),
                type:'article',
                message_text: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
                title: 'Duck It',
                description: `${query}`
            }];
        }
        $.answer(results, {}, function(result) {
        });
    }
}

tg.router
    .inlineQuery(new DuckController())