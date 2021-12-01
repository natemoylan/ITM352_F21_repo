var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
// Set filename as variable for user_data.json
var filename = "./user_data.json";
// npm install query-string in terminal
var queryString = require("query-string");
app.use(express.urlencoded({ extended: true }));



/* Another way of reading file system */

// Reads file system 
//data = fs.readFileSync(filename, 'utf-8');

//Parses data into json 
//user_data = JSON.parse(data);
//console.log("User_data=", user_data);

//Checks if file exists
if (fs.existsSync(filename)) {
    //Reads user_data.json
    //Moved the require in here from Ex1
    user_data = require(filename);
    console.log("User_data = ", user_data);

    //Reads the stats of the file
    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename");
}

username = 'newuser';
user_data[username] = {};
user_data[username].password = 'newpass';
user_data[username].email = 'newuser@user.com';


/* Gets Login page */

//Copied from Ex3 Lab 14
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


/* Processing Login */

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not

    //Grabs information 
    POST = request.body;
    //Grabs username and password from the form
    user_name = POST["username"];
    user_pass = POST["password"];
    // For example, dont print out user password
    console.log("Username = " + user_name + " Password = " + user_pass);

    //Checks if username is taken 
    if (user_data[user_name] != undefined) {
        //If it is defined, check if passwords match
        if (user_data[user_name].password == user_pass) {
            //Good Login 
            response.send("Got a good login");
        } else {
            //Bad Login, redirect back to login page
            response.send("Sorry Bud")
        }
    } else {
        // Bad username
        response.send("Bad username");
    }



    console.log("Got a POST to login");

});






/* Gets Registration page */

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



/* Processing Registration */

app.post("/register", function (request, response) {
    // process a simple register form

    //Grabs information 
    POST = request.body;


    //Grabs username and password from the form
    user_name = POST["username"];
    user_pass = POST["password"];
    user_email = POST["email"];

    // For example, dont print out user password
    console.log("Username = " + user_name + " Password = " + user_pass);

    // Creates new entry for user data
    user_data[user_name] = {};
    user_data[user_name].username = user_name
    user_data[user_name].password = user_pass;
    user_data[user_name].email = user_email;

    //Writes user reg into user_data.json
    data = JSON.stringify(user_data);
    fs.writeFileSync(filename, data, "utf-8")
    // Response.send to the page
    response.send("User " + user_name + " added");
});


app.listen(8080, () => console.log(`listening on port 8080`));

