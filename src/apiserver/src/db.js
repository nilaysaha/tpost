'use strict';

exports = module.exports = function(mongoose,fs) {

  const MONGO_URL = 'mongodb://35.157.103.106:27018/tpost'

  mongoose.Promise = Promise;
  
  return new Promise((resolve,reject) => {
    mongoose.connect(MONGO_URL)
    .then(
      () => {
	console.log("now connected to mongo db:",MONGO_URL)
	resolve(mongoose)
      },
      err => {
	console.error("error in mongodb connection via mongoose. Error is:",err)
	reject(err)
      }
    )    
  })
}

exports['@singleton'] = true;
exports['@require'] = ['mongoose','fs'];
