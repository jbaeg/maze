const express = require("express");
const path = require("path");
const TelegramBot = require('node-telegram-bot-api');
const token = '7283094295:AAGZUTS5n7N0x20kN26W501hcwN8iqZHL7c';
const server = express();
const bot = new TelegramBot(token, {polling: true});
const port = process.env.PORT || 5000;
const gameName = "mazenew";
const queries = {};
server.use(express.static(path.join(__dirname,'mazenew')));
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if u want to play"));
/*bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const resp = '안녕하세요! 여기를 클릭하세요: [링크](https://jbaeg.github.io/maze/)';

    // 메시지를 전송합니다
    bot.sendMessage(chatId, resp, { parse_mode: 'Markdown' });
});*/

bot.onText(/start|game/, (msg) => bot.sendMessage(msg.from.id, gameName));

bot.on('callback_query', function (query) {
    if(query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, " + query.game_short_name + "' is not avaiable");
    }
    else{
        queries[query.id] = query;
        let gameurl = "https://jbaeg.github.io/maze/";
        bot.answerCallbackQuery({callback_query_id: query.id,
            url: gameurl
        });
    }
});

bot.on('inline_query', function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);    
});

