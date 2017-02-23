'use strict'

const Ioc = require('electrolyte')

module.exports =  exports = function(){
  Ioc.use(Ioc.node_modules())
  Ioc.use('src',Ioc.dir(__dirname+'/src'))
  return Ioc
}
