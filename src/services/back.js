let crypto = require('../utils/crypto');

let back = opt => {
  return async (req, res, next) => {
    // let {data}  =res.locals;
    let ph = req.path;
    let backCheck = null;
    if (typeof opt === 'object') {
      let { url, back } = opt;
      url = url[0] !== '/' ? '/' + url : url;
      if (url === ph) {
        backCheck = back;
      }
    }
    if (typeof backCheck === 'function') {
      backCheck({ req, res, crypto });
      return;
    } else {
      next();
    }
  };
};

module.exports = back;
