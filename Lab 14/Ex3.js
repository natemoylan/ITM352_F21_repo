var fs = require ('fs');
var filename = "./user_data.json"
var express = require('express');
var app = express();
var myParser = require("body-parser");
var queryString = require ("qs");

app.use(myParser.urlencoded({ extended: true }));

if (fs.existsSync(filename)) {

    data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
    console.log ("User Data is: ", user_data);

    fileStats = fs.statSync(filename);
    console.log('File ' + filename + ' has ' + fileStats.size + ' characters.');

} else {
    console.log('Wrong File Stupid!')
};

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
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

app.listen(8080, () => console.log(`listening on port 8080`));