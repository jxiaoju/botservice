const uuidv5 = require('uuid/v5');
let utils = require('../utils');



let run = (appLevel, tableAlias, webhookId, uuidMap) => {
  let defaultUuidKeys = {
    zoom: {
      account: ['zoom_account_id', 'zoom_user_type'],
      user: ['zoom_account_id', 'zoom_user_id', 'zoom_user_type']
    },
    webhook: {
      account: [webhookId],
      user: [webhookId]
      // user: ['zoom_user_id', webhookId]
    }
  };


  uuidMap = uuidMap || defaultUuidKeys;

  let matchObj = {
    zoom: uuidMap.zoom[appLevel],
    webhook: uuidMap.webhook[appLevel]
  };

  return data => {
    if (typeof data !== 'object') {
      return data;
    }
    if ('uuid' in data) {
      return data;
    }
    let uuidKeys = matchObj[tableAlias];
    

    if (!Array.isArray(uuidKeys)) {
      return data;
    }
    let keyStrings = utils.createUuidName(uuidKeys, data);

    if (keyStrings === false) {
      return data;
    }
    let uuid = uuidv5(keyStrings, process.env.uuidNamespace);
    let out = Object.assign(data, { uuid });

    return out;
  };
};

module.exports = run;
