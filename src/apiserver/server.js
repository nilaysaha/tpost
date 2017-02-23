'use strict'

let Ioc = require(__dirname+'/init')()
let appPromise = Promise.all([Ioc.create('src/app')])

console.log(appPromise)

// appPromise
//   .then(() => {
//     console.log('returned after starting server')
//   })
