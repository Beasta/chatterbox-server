/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

module.exports = function(request, response) {


  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  // headers['Content-Type'] = "text/plain";

  //change the status Code for instance of POST
  //default 200 will work for GET and OPTION
  if(request.method === "POST"){
    statusCode = 201;
  }

  if(actions[request.method]){
    actions[request.method](statusCode,response);
  }

};

var actions = {
  "GET":function(statusCode,response){
    sendResponse(statusCode,response);
  },
  "POST":function(statusCode,response){
    sendResponse(statusCode,response);
  },
  "OPTIONS":function(statusCode,response){
    sendResponse(statusCode,response);
  },

}

var sendResponse = function(statusCode,response){
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end(JSON.stringify(db));
}

//Database of messages
var db=[{'username':'bob','text':'this is fun','objectID':0}];

//Default headers
var defaultCorsHeaders = {
  "Content-Type":"text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// module.exports.requestHandler = requestHandler;
