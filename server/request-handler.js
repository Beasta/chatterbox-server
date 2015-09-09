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
    actions[request.method](response,request);
  }

};

var collectData = function(request,cb){
  var curData = "";
  request.on('data',function(chunk){
    curData += chunk;
  });
  request.on('end',function () {
    var msg=JSON.parse(curData);
    cb(msg);
  });
}

var actions = {
  "GET":function(response,request){
    
    sendResponse(response, {'results':db});

  },
  "POST":function(response,request){

    collectData(request,function(message){
      message.objectID = db.length;
      db.push(message);
      console.log(db);
      sendResponse(response, message, 201);
    });

  },
  "OPTIONS":function(response,request){
    
    sendResponse(response, null);
  },

}
 
var sendResponse = function(response, data, statusCode){
    statusCode = statusCode || 200;
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end(JSON.stringify(data));
}

//Database of messages
var db=[{'username':'bob','text':'this is fun','objectID':0}];

//Default headers
var defaultCorsHeaders = {
  "Content-Type":"application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// module.exports.requestHandler = requestHandler;
