var fs = require ('fs');
var filename = "./user_data.json"
var express = require('express');
var app = express();
var myParser = require("body-parser");
var queryString = require ("qs");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');

app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));

app.use(myParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

if (fs.existsSync(filename)) {

    data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
    console.log ("User Data is: ", user_data);

    fileStats = fs.statSync(filename);
    console.log('File ' + filename + ' has ' + fileStats.size + ' characters.');

} else {
    console.log('Wrong File Stupid!')
};



//Cookie
app.get("/", function (request, response) {
    if (request.session.page_views){
        request.session.page_views++;
        response.send ('Welcome back. This is visist # ' + request.session.page_views);

    } else {
        request.session.page_views =1;
        response.send ('Welcome to this page for the first time!');
    }
});



app.get("/set_cookie", function (request, response) {
    my_name = "Nate Moylan";

    response.cookie("My name", my_name, {maxAge: 5000}).send("Cookie sent");
    
});

app.get("/get_cookie", function (request, response) {
    my_cookie_name = request.cookies["My Name"];

    response.send("User" + my_cookie_name + "recognized");
});

//Sessions
app.get("/use_session", function (request, response) {
    response.send("Your session ID is ") + request.session.id
});




app.get("/login", function (request, response) {
    // Give a simple login form
    if (typeof request.session['last_login'] != undefined){
        login_time ="Last login was " + request.session["last_login"];
    } else {
        login_time ="First Login";
    }
    str = `
<body>
Login infor: ${login_time}
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log('Got a POST to login.');

    POST = request.body;
    user_name = POST["username"];
    user_pass = POST ["password"];

    console.log("Username = " + user_name + "Password = " + user_pass);

    if (user_data[user_name] != undefined){
        if (user_data[user_name].password == user_pass){
            // Good login
            request.session['last_login'] = Date();
            request.cookie("username", user_name);
            request.session['username'] = user_name;
            response.send("Got a good login");
        } else{
            // Bad Login, redirect
            response.send ('Sorry bud')
        }
    } else{
        // Bad username
        response.send("Bad Username");
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });