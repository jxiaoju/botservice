var crypto = require('crypto');

let encrypt = (str, namespace) => {
  var mykey = crypto.createCipher('aes-128-cbc', namespace);
  var mystr = mykey.update(str, 'utf8', 'hex');
  mystr += mykey.final('hex');
  return mystr;
};

let decrypt = (str, namespace) => {
  var mykey = crypto.createDecipher('aes-128-cbc', namespace);
  var mystr = mykey.update(str, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  return mystr;
};

module.exports = {encrypt,decrypt};