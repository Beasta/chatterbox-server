<<<<<<< HEAD
  /*************************************************************
=======
module.exports = function(request, response) {
>>>>>>> secondBranch


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

<<<<<<< HEAD
var fileSystem = require('fs');
var requestHandler = function(request, response){

  var statusCode = 200;
  var findings;
  var reqData = "";
  //Listen for data
  request.on("data", function(chunk){
    reqData += chunk;
  });
  //Listen for end
  request.on("end", function(){
    console.log(request.method);
    console.log("Data: " + reqData);
    //If we have data
    if(reqData){
      var dbData = JSON.parse(reqData);
      //If post
      if(request.method === "POST"){
        findings = dbReadWrite("POST", dbData/*, options*/);
        statusCode = 201;//Successful post
      }
      //Else if get
      else if(request.method === "GET"){
        findings = dbReadWrite("GET", dbData/*, options*/);
        statusCode = 200;//Successful get
      }
    }
    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;
    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = "application/json";
   // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);
    //If findings wasn't defined, set the end
    if(findings === undefined || (findings.results !== undefined && findings.results.length === 0)){
      response.end('{"results": []}');
    }
    //Otherwise, set to JSON.stringify on findings
    else{
      console.log(JSON.stringify(findings.results));
      response.end(JSON.stringify(findings));
    }
  });
};

// var requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   console.log("Serving request type " + request.method + " for url " + request.url);
//   var statusCode;
//   var findings;
//   var options;
//   //If trying post
//   if(request.method === "POST"){
//     console.log(request.body);
//     //console.log(request.json === undefined);
//     var x = [];
//     for(var k in request){
//       x.push(k);
//     }
//     console.log(x.join(", "));
//     console.log(request.readable);/*
//     findings = dbReadWrite("POST", request.json/*, options*///);
//     //Assign status code for post
//     statusCode = 201;
//   }
//   //If trying to get
//   else if(request.method === "GET"){
//     findings = dbReadWrite("GET"/*, null, options*/);
//     statusCode = 200;
//   }
//   // The outgoing status.
//   // var statusCode = 200;

//   // See the note below about CORS headers.
//   var headers = defaultCorsHeaders;

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.
//   headers['Content-Type'] = "application/json";

//   //Set data
//   // headers["data"] = "{}";
//   // headers["body"] = "{}";
  
//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   response.writeHead(statusCode, headers);
//   // console.log(response["data"]);
//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.

//   response.end(JSON.stringify(findings));
// };

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
=======
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
>>>>>>> secondBranch
var defaultCorsHeaders = {
  "Content-Type":"application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

<<<<<<< HEAD
//Populating results
//io mode: 1 == reading, 2 == writing, 8 == appending
//filesystemobject.OpentextFile(filename, iomode, create, format)
var dbReadWrite = function(iomode, data){
  var obj = {results: []};

  if(iomode === 'POST'){
    var currDB = dbReadWrite("GET").results;
    if(data === undefined){
      console.log("No data to write.");
    }
    //Push data to currDB
    currDB.push(data);
    //Push database into obj
    obj.results = currDB;
    //Write new data to file in its entirety
    fileSystem.writeFileSync("database.txt", JSON.stringify({"results": currDB}));
  }
  else if(iomode === 'GET'){
    var readData = JSON.parse(fileSystem.readFileSync("database.txt"));
    obj = readData;
    // console.log("Get Request");
    // console.log(obj);
  }
  else{
    console.log('no post no get');
  }
  console.log("io method:" + iomode);
  console.log(obj);
  return obj;
};

//Read data into current db
//var currDB = dbReadWrite("GET").results;

// var tmpData = {"id": 1, "name": "1name"};, {"id": 1, "name": "1name"}, {"id": 2, "name": "2name"}];
// dbReadWrite("POST", tmpData);
// dbReadWrite("POST", tmpData);
// var readData = dbReadWrite("GET");
// console.log(readData);

//Setting request handler for export
module.exports.requestHandler = requestHandler;
=======
// module.exports.requestHandler = requestHandler;
>>>>>>> secondBranch
