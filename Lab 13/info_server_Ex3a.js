var express = require('express');
var app = express();
var myParser = require("body-parser");
3
// Route to handle any request, also calls next.
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

//Route to handle jus the path/test
app.get('/test', function(request,response,next){
    response.send('Got a GET request to path: test');
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
   response.send(request.body); 
});


//Handle request for any static file
app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

