'use strict';

exports = module.exports = function(assert,restify,plugins,routes) {

  const SERVER_PORT = 3000
  const VERSION = '1.0.0'
  
  const server = restify.createServer({
    name: 'curlServerApi',
    version: VERSION
  })

  server.use(plugins.acceptParser(server.acceptable))
  server.use(plugins.queryParser())
  server.use(plugins.bodyParser())

  server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    return next();
  });

  //attach routes
  routes.init(server)
  
  //start server
  server.listen(SERVER_PORT, function () {
    console.log('%s listening at %s', server.name, server.url)
  })
}

exports['@singleton'] = true;
exports['@require'] = ['assert','restify','restify-plugins','src/routes/index'];


