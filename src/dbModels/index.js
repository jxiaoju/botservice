// var dynogels = require('dynogels');
let createModel = require('./createModel');
// let action = require('./action');
let TransformAction = require('./transform');
// let botConfig = require('../../botConfig');
// let parseDb = require('../parse/db');
let matchUuid = require('./matchUuid');
var dynogels = require('dynogels');
// let dbInfo = parseDb(botConfig);
// let shortcutItem=require('./shortcutItem');
// let run = dbConfig => {
// dynogels.AWS.config.update({ region: process.env.tableRegion });
// let { schemas, webhookId,thirdPartProps, appLevel } = dbInfo;

module.exports={
  create({tableName,keyConfig={},uuidMap,dbConfig,appLevel}){
    // if(typeof tableName!=='object'){
    // }
    let models = createModel(dbConfig.schemas,tableName,keyConfig,appLevel);
    let keys = Object.keys(models);
    let out = {};
    keys.forEach(key => {
      // console.log(123,key)
      //exp:create zoom,webhook table,
      let injectUuid = matchUuid(dbConfig.appLevel, key, dbConfig.webhookId,uuidMap);
    
      out[key] = new TransformAction(models[key], injectUuid);
    });
    return out;
  },
  setting(option){
    dynogels.AWS.config.update(option);
  }
};


// module.exports = { models: out, webhookId, thirdPartProps, appLevel,shortcutItem,accountUserId:'account' };
