let zoomAuth = (zoom)=> opt => {

  let { bot, auth, log } = zoom;

  return async function(req, res, next) {
    let { code } = req.query;
    try {
      let connection = await auth.connectByCode(code);
      let app = bot.create({ auth: connection });
      //send zoom app
      res.locals.zoomApp = app;
      next();
    } catch (e) {
      log.error(e);
      // let defaultTxt = 'zoom auth2 error';
      let defaultTxt = e;
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

module.exports = zoomAuth;
