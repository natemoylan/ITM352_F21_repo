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
   var data = fs.readFileSync(filename, 'utf-8');
   var user_data = JSON.parse(user_data);
} else {
    console.log(`${filename} does not exist!`);
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
        <input type="text" placeholder="Enter first and last name" class="form__input" name="fullname" id="fullname" required title="Full First and last name, letters only.">

        <!--Username-->
        <label for ="username"><b>Username</b></label>
        <input type="text" placeholder="Enter username" class="form__input" name="username" id="username"   required title="Minimum: 4 Characters. Maximum: 10 Characters. Numbers and/or Letters Only.">

        <!--Email-->
        <label for ="email"><b>Email</b></label>
        <input type="email" placeholder="Enter email" name="email" id="email" required title="Please enter a valid email.>

        <!--Password-->
        <label for ="password"><b>Password</b></label>
        <input type="password" placeholder="Enter password" class="form__input" name="password" id="password" required title="Minimum: 6 Characters">

        <!--Confirm Password-->
        <label for ="confirm_password"><b>Confirm Password</b></label>
        <input type="password" placeholder="Re-enter password" class="form__input" name="confirm_password" id="confirm_password" required title="Minimum: 6 Characters">
        
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

app.post("/process_register", function (request, response) {
    console.log(request.body);

    //assumes no errors at first
    var reg_errors = {};

    // Fullname Validation// 
    if(/^[A-Za-z, ]+$/.test(request.body.fullname)){ 
    } 
    else {
        reg_errors['fullname'] = 'Please only use letters for fullname';
    }
    if(request.body.fullname.length > 30 && request.body.fullname < 1){
        reg_errors['fullname'] = 'Maximum 30 Characters'; 
    }

    //Username Validation//
    var reg_username = request.body.username.toLowerCase(); // Requires username to be in lowercase

    if(request.body.username.length > 10 || request.body.username.length < 4){
        reg_errors['username'] = 'Username should be within 4 and 10 characters.';
    }
    if(typeof user_data[reg_username] != 'undefined'){
        reg_errors ['username'] = 'Sorry, this username is already taken.'; 
    }
    if(typeof user_data[reg_username] == ''){
        reg_errors['username'] = 'Please enter a username.';
    }
    if(/^[0-9a-zA-Z]+$/.test(request.body.username)){
    } else {
        reg_errors['username'] = 'Numbers and letters only please.';
    }

    //Email Validation//
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(request.body.email)){
    } 
    else {
        reg_errors['email'] = 'Please enter a valid email (Ex: user@gmail.com';
    }

    //Password Validation//
    if(request.body.password < 6){
        reg_errors['password'] = 'Please make a password longer than 6 characters.';
    }

    //Confirm Password Validation 
    if(request.body.password !== request.body.confirm_password) {
        reg_errors['confirm_password'] = 'Passwords do not match.';
    }

    // If no errors then save new user data in JSON file and redirect to receipt
    if(Object.keys(reg_errors).length == 0){
        console.log ('no errors')

        var username = request.body['username'].toLowerCase();
        user_data[username] = {};
        user_data[username]["name"] = request.body['fullname'];
        user_data[username]["password"] = request.body['password'];
        user_data[username]["email"] = request.body['email'];
        
        fs.writeFileSync(filename, JSON.stringify(user_data), "utf-8");
            temp_qty_data['username'] = username;
            temp_qty_data['email'] = user_data[username]['email'];
            let params = new URLSearchParams(temp_qty_data);
            response.redirect('/receipt?' + params.toString());
    } else {
        request.body['reg_errors'] = JSON.stringify(reg_errors);
        let params = new URLSearchParams(request.body);
        response.redirect('register.html?' + params.toString());
    }

});


app.listen(8080, () => console.log(`listening on port 8080`));