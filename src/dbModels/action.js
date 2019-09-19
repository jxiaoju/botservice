class Action {
  constructor(model) {
    this.model = model;
  }
  save(data) {
    return new Promise((resolve, reject) => {
      this.model.create(data, function(err, acc) {
        if (err) {
          reject(err);
        } else {
          resolve(acc);
        }
      });
    });
  }
  update(data, expected) {
    return new Promise((resolve, reject) => {
      let arr = [data, expected];
      this.model.update(...arr, function(err, acc) {
        if (err) {
          reject(err);
        } else {
          resolve(acc);
        }
      });
    });
  }
  delete(data, expected) {
    return new Promise((resolve, reject) => {
      let arr = [data, expected];
      this.model.destroy(...arr, {ReturnValues: 'ALL_OLD'}, function(err, acc) {
        if (err) {
          reject(err);
        } else {
          resolve(acc);
        }
      });
    });
  }
  get(data, opt) {
    return new Promise((resolve, reject) => {
      let arr = [data, opt];
      this.model.get(...arr, function(err, acc) {
        if (err) {
          reject(err);
        } else {
          resolve(acc);
        }
      });
    });
  }
  query(primaryKey) {
    return new Promise((resolve, reject) => {
      // this.model.getItems(data, function(err, infos) {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(infos);
      //   }
      // });
    
      this.model.query(primaryKey).exec(function(err, infos) {
        if (err) {
          reject(err);
        } else {
          resolve(infos);
        }
      });



    });
  }
  scan() {
    return new Promise((resolve, reject) => {
      this.model.scan().exec((err, da) => {
        if (err) {
          reject(err);
        } else {
          resolve(da);
        }
      });
    });
  }
}

module.exports = Action;
