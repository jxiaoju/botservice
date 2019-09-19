

let zoomAppMiddle = (zoom)=> opt => {

  let { bot, auth, log } = zoom;

  return async function(req, res, next) {
    try {
      let connection =  auth.connect();
      let app = bot.create({ auth: connection });
      res.locals.zoomApp = app;
      next();
    } catch (e) {
  
    }
  };
};

module.exports = zoomAppMiddle;
