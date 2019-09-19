let receive=require('./receive');
let back=require('./back');

let createWebhookMiddle=require('./createWebhookMiddle');
let createZoom=require('./createZoom');
let createZoomAppMiddle=require('./createZoomAppMiddle');
let createZoomAuthMiddle=require('./createZoomAuthMiddle');


module.exports=function({
    commands,
    config
}){


let zoomInfo=createZoom(commands,config);

return {
    receive,
    back,
    webhookMiddle:createWebhookMiddle(zoomInfo),
    zoom:zoomInfo,
    zoomAppMiddle:createZoomAppMiddle(zoomInfo),
    zoomAuthMiddle:createZoomAuthMiddle(zoomInfo)
};

};

