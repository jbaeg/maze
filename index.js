
const express = require("express");
const path = require("path");
const TelegramBot = require('node-telegram-bot-api');
const token = '7401587624:AAG5yA2-ExwLyk3K9opiEgGb5460pcOLTBo';
const server = express();
const bot = new TelegramBot(token, {polling: true});
const port = process.env.PORT || 5000;
const gameName = "mazenew";
const queries = {};
server.use(express.static(path.join(__dirname,'mazenew')));
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if u want to play"));
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

