'use strict';

exports = module.exports = function(passport,requestLib,authenticateLib){
  
  let init = (server) => {
    
    server.get('/echo/:value',(req,res,next) => {
      console.log("inside echo function")
      res.json({'value':req.params.value})
      return next();
    })    

    //saving and fetching data from curl request
    server.post('/saveRequestParams',requestLib.saveRequestParams)
    server.get('/getUniqueUrls',requestLib.getUniqueUrls)

    //authentication routes
    server.post('/login',authenticateLib.login);
    server.post('/register',authenticateLib.register);
   
    
  }
  
  return {init}

}

exports['@singleton'] = true;
exports['@require'] = ['passport','src/routes/requestLib','src/routes/authenticate'];
