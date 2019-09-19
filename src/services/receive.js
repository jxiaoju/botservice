// let zoom = require('./zoom');
//get zoom config
// let { bot, auth, log } = zoom;
let crypto = require('../utils/crypto');

//opt is {url:'command',method:'post'}

let receiveFunc = opt => {
  return async (req, res, next) => {
    // let {url,method}=opt;
    let ph = req.path;
    let receiveCheck = null;
    if (typeof opt === 'object') {
      let { url, receive } = opt;
      url = url[0] !== '/' ? '/' + url : url;
      if (url === ph) {
        receiveCheck = receive;
      }
    }
    if (typeof receiveCheck === 'function') {
      receiveCheck({ req, res, next, crypto });
      return;
    } else {
      next();
    }
  };
};

module.exports = receiveFunc;
