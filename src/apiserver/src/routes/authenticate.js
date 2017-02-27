'use strict';

exports = module.exports = function(passport,User){

  let _pregister = (req,res) => {

    passport.authenticate('local')(req, res, function () {
      res.status(200).json({
	status: 'Registration successful!'
      });
    });
  }

  let _plogin = (req,res) => {

    passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login',
				   failureFlash:"Invalid username and/or password",
				   successFlash:'Welcome to the App'})    
  }
  
  let register = (req,res,next) => {

    let username = req.body.username
    let password = req.body.password
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    
    let query = {"username":username,"password":password,"firstname":firstName,"lastname":lastName}
    let update = { expire: new Date() }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }
    
    User.findOneAndUpdate(query,update,options)
      .then( val => {
	this._register(req,res)
      })
      .catch(err => {
	console.error('error in updating / creating new user')
	res.json({error:new Error('failed to create/update new user')})
      })

    return next()
  };


  let login = (req,res,next) => {

    let username = req.body.username
    let password = req.body.password

    let query = {"username":username,"password":password}
    let options = {}
    
    User.find(query,{},options)
      .then(val => {
	this._plogin(req,res)
      })
      .catch(err => {
	console.error('error in finding user for login')
	res.json({error:new Error('Error in finding user')})
      })       
  };
 
  return {register,login}  
}


exports['@singleton'] = true;
exports['@require'] = ['passport','src/models/userModel'];

