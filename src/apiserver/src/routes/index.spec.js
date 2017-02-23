'use strict';

exports = module.exports = function(mongoose,chai,chaiHttp,requestModel){

  chai.use(chaiHttp);

  
}

exports['@singleton'] = true;
exports['@require'] = ['src/db','chai','chai-http','src/models/requestModel'];


