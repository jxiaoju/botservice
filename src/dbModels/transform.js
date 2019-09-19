// const uuidv5=require('uuid/v5');
// let appConfig=require('../appConfig');
// let utils=require('../utils');
let Action=require('./action');

class TransformAction extends Action{
    constructor(model,injectUuid){
        super(model);
        // this.tableAlias=tableAlias;
        this.injectUuid=injectUuid;
    }
    save(data){
        let newData=this.injectUuid(data);
        // console.log(newData,1111);
        return super.save(newData);
    }
    update(data,expected){
        let newData=this.injectUuid(data);
        return super.update(newData,expected);
    }  
    delete(data,expected){
        let newData=this.injectUuid(data);
        return super.delete(newData,expected);
    }
    get(data,opt){
        let newData=this.injectUuid(data);
        return super.get(newData,opt);
    }
    query(data){
        let newData=this.injectUuid(data);
        return super.query(newData.uuid);
    }
    scan(){
        return super.scan();
    }
}

module.exports=TransformAction;







