const { oauth2, client, setting, log } = require('@zoomus/chatbot');
// let botConfig=require('../../botConfig');
// let parseCommands=require('../parse/commands');
//see https://www.npmjs.com/package/zoom-bot-sdk for detail

// let commandsInfo=parseCommands(botConfig)||[];

setting.caseSensitive(false);

setting.retry({
  sendMessage: {
    no: 3,
    timeout: function(no) {
      return Math.random() * (3000 - 1000) + 1000;
    },
    condition(backMsg, type) {
      if (
        typeof backMsg === 'object' &&
        backMsg.code &&
        backMsg.code.toString() === '7010'
      ) {
        return true;
      }
    }
  }
});

module.exports = function(commands, config) {
  let oauth2Client = oauth2(
    config.clientId || process.env.zoomClientId,
    config.clientSecret || process.env.zoomClientSecret,
    config.redirect_uri || process.env.zoomRedirect_uri + '/auth'
  );

  let zoomBot = client(
    config.clientId || process.env.zoomClientId,
    config.verifyCode || process.env.zoomVerifyCode,
    config.botJid || process.env.zoomBotJid,
    process.env.app
  )
    .commands(commands)
    .configurate({ help: true, errorHelp: true })
    .defaultAuth(oauth2Client.connect());

  return {
    auth: oauth2Client,
    bot: zoomBot,
    log
  };
};
