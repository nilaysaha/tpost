'use strict';

exports = module.exports = function(requestModel){

  console.log("requestModel inside route:",requestModel)
  
  let saveRequestParams = (req,res,next) => {
    
    let method = req.query.method
    let url = req.query.url
    let body = (typeof(req.body) != 'object')?req.body:JSON.stringify(req.body);
    let objToSave = {
      url:url,
      method:method,
      body:body
    };
    
    let saveRequest = new requestModel(objToSave);            
    
    saveRequest.save()
      .then(doc => {
	console.log('successfully saved data to model:',doc)
	res.send({message:'saved document with id:'+doc}) //where is the id of the document.	  
      })
      .catch(err => {
	console.error("error in request:",err)
	res.json({error:new Error('Failed to save request params to db:'+err)})	  
      })
    
    return next()        
  }

  let getUniqueUrls = (req,res,next) => {

    requestModel.find().distinct('url')
      .then( urlList => {
	res.json({"urlList":urlList})	  	  
      })
      .catch(err => {	  
	console.error('error in querying urllist:',err)
	res.json({error:new Error('error in querying distinct query urls:'+err)})
      })
    
    return next()      
  }

  return {saveRequestParams,getUniqueUrls}        
  
}

exports['@singleton'] = true;
exports['@require'] = ['src/models/requestModel'];
