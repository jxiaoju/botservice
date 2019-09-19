let webhookMiddle = (zoom)=> opt => {

  let { bot, auth, log } = zoom;

  return async (req, res, next) => {
    let { body, headers } = req;
    try {
      //get webhook data
      let data = await bot.handle({ body, headers });
      //get app instance
      let newApp = bot.create({ auth: auth.connect() }); 
      res.locals.zoomApp = newApp;
      res.locals.zoomWebhook = data;
      next();
    } catch (e) {
      log.error(e);
      let defaultTxt = 'webhook verify error';
      if (typeof opt === 'object') {
        let { statusCode = 400, msg = defaultTxt } = opt;
        if (typeof msg === 'function') {
          msg = msg(e);
          msg = msg ? msg : defaultTxt;
        }
        res.status(statusCode).send(msg);
      } else {
        res.status(400).send(defaultTxt);
      }
    }
  };
};

module.exports = webhookMiddle;
