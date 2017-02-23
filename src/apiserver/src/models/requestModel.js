'use strict'

exports = module.exports = function(mongoose){

  console.log("received mongodb connector:",mongoose)

  let debugConnection = function(){    
    const connection = mongoose.connections[0];
    console.log("inside debugconnection")
    Object.keys(connection.models).forEach( collection => {
      // You can get the string name.
      console.info("collection name:",collection);
    });
  }

  debugConnection();
  
  const Schema = mongoose.Schema;
  
  let requestSchema = new Schema({
    url:  String,
    method: String,
    body:   String,
    authentication:
    {
      token:String,
      username: String,
      password: String,
      type:String    
    }
  },{
    timestamps: true
  });
  
  return mongoose.model('Request', requestSchema);  
}


exports['@singleton'] = true;
exports['@require'] = ['src/db'];
