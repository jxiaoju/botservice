var dynogels = require('dynogels');

let createModel = (schemas,tableName,keyConfig,appLevel) => {
  let out = {};
  let zoomKeyConfig=keyConfig.zoom||{};
  let webhookKeyConfig=keyConfig.webhook||{};
  let relationshipKeyConfig=keyConfig.relationship||{};

    out.zoom=dynogels.define(tableName.zoom, {
      schema:schemas.zoom,
      timestamps : true,
      hashKey:zoomKeyConfig.hash||'uuid',
      tableName: tableName.zoom
    });
    
    out.webhook=dynogels.define(tableName.webhook, {
      schema:schemas.webhook,
      timestamps : true,
      hashKey:webhookKeyConfig.hash||'uuid',
      rangeKey : webhookKeyConfig.range||'zoom_channel_id',
      tableName: tableName.webhook
    });

    // is user level
    if(appLevel==='user'){
      out.relationship=dynogels.define(tableName.relationship, {
        schema:schemas.relationship,
        timestamps: true,
        hashKey: relationshipKeyConfig.hash||'zoom_account_id',
        rangeKey: relationshipKeyConfig.range||'zoom_user_id',
        tableName: tableName.relationship
      });
    }

  return out;
};

module.exports = createModel;
