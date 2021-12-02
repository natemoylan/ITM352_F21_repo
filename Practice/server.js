var fs = require('fs');
var express = require('express');
var app = express();
// npm install body-parser
var myParser = require("body-parser");
// npm install query-string in terminal
var queryString = require("query-string");
const { URLSearchParams } = require('url');
var filename = './user_data.json';



var errors={}; 
var saved_reg_qty_array; // temporary store user selected quantities until needed for invoice. 

// Monitors all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});

// Set filename as variable for user_data.json
var filename = './user_data.json';

//Checks if file exists
if (fs.existsSync(filename)) {
    //Reads user_data.json
    //Moved the require in here from Ex1
    let user_data_str = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(user_data_str);
    console.log("User_data = ", users_reg_data);

    //Reads the stats of the file
    fileStats = fs.statSync(filename);
    console.log("File" + filename + "has" + fileStats.size + "characters");
} else {
    console.log("Enter the correct filename");
    users_reg_data = {};
}

app.use(express.urlencoded({ extended: true }));


/* Just to load the register page */

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
    <body>
    <form action = "/register" method = "POST" name = "register">
    <div class = "container">
        <h1>Register Account</h1>
        <p>Please register an account before purchasing tickets!</p>
       
        <!--Full Name-->
        <label for ="fullname"><b>Full Name</b></label>
        <input type="text" placeholder="Enter first and last name" class="form__input" name="fullname" id="fullname" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+" required title="Full First and last name, letters only.">

        <!--Username-->
        <label for ="username"><b>Username</b></label>
        <input type="text" placeholder="Enter username" class="form__input" name="username" id="username"  pattern=".[a-z0-9]{3,10}" required
        title="Minimum: 4 Characters. Maximum: 10 Characters. Numbers and/or Letters Only.">

        <!--Email-->
        <label for ="email"><b>Email</b></label>
        <input type="email" placeholder="Enter email" name="email" id="email"  pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]{3,}$" required title="Please enter a valid email.>

        <!--Password-->
        <label for ="password"><b>Password</b></label>
        <input type="password" placeholder="Enter password" class="form__input" name="password" id="password" pattern=".{6,}" required title="Minimum: 6 Characters">

        <!--Confirm Password-->
        <label for ="confirm_password"><b>Confirm Password</b></label>
        <input type="password" placeholder="Re-enter password" class="form__input" name="confirm_password" id="confirm_password" pattern=".{6,}" required title="Minimum: 6 Characters">
        
        <br>
        <button type ="submit" class = "reg_btn">Register</button>
    </div>

        <div class = "container sign_in">
            <p>Already have an account? <a href ="./public/login.html">Sign In</a>.</p>
        </div>
        
    </form>
    </body>
        `;
    response.send(str);
});






/* Processing Register page */

app.post("/register", function (request, response) {
    // Setting username to be case insensitive
    var username = request.body.username.toLowerCase();

    /* Process Simple Registration Form */

    // Checks if user input is valid 
    if(typeof users_reg_data[username] != 'undefined'){
        errors['username_taken'] = `Sorry ${username} is already registered!`
    } 
    // Setting the users input within user_reg_data
    if (typeof users_reg_data[username] == 'undefined' && (request.body['password'] == request.body['confirm_password'])){
        users_reg_data[username] = {};
        users_reg_data[username].password = request.body['password'];
        users_reg_data[username].email = request.body['email'];
        users_reg_data[username].name = request.body['name']

        fs.writeFileSync('./user_data.json', JSON.stringify(users_reg_data));
        saved_reg_qty_array['username'] = username;
        let params = new URLSearchParams(saved_reg_qty_array);

        response.redirect('/Receipt' + params.toString());
        console.log("Sucessfully Registered");
    } else {
        response.redirect('./register.html' + params.toString());
        console.log("not registered");
    }
});


app.listen(8080, () => console.log(`listening on port 8080`));