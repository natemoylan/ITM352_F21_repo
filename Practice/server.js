var fs = require('fs');
var express = require('express');
var app = express();
// npm install body-parser
var myParser = require("body-parser");
// npm install query-string in terminal
var queryString = require("query-string");

// Monitors all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});

// Set filename as variable for user_data.json
var filename = "./user_data.json";

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
        <input type="confirm_password" placeholder="Re-enter password" class="form__input" name="confirm_password" id="confirm_password" pattern=".{6,}" required title="Minimum: 6 Characters">

        <br>
        <button type ="submit" class = "reg_btn">Register</button>

    </div>

        <div class = "container sign_in">
            <p>Already have an account? <a href ="./login.html">Sign In</a>.</p>
        </div>

    </form>
        `;
    response.send(str);
});



/* Processing Register page */

app.post("/register", function (request, response) {

    // -------------Acquiring request body---------- //
    
    POST = request.body;

    user_fullname = POST ["fullname"];
    user_name = POST["username"];
    user_pass = POST["password"];
    user_confirm_pass = POST ["confirm_password"];
    user_email = POST["email"];

    console.log("Username = " + user_name + " Email = " + user_email);

     // Creates new entry for user data
     user_data[user_name] = {};
     user_data[user_name].fullname = user_fullname
     user_data[user_name].username = user_name
     user_data[user_name].password = user_pass;
     user_data[user_name].email = user_email;

    //Writes user reg into user_data.json
    data = JSON.stringify(user_data);
    fs.writeFileSync(filename, data, "utf-8")
    response.redirect ('register.html')
 

   

    // -------------Full Name Validation---------- //


    // -------------Username Validation---------- //

    // -------------Email Validation---------- //

    // -------------Password Validation---------- //

    // -------------Confirm Password Validation---------- //
    

});


app.listen(8080, () => console.log(`listening on port 8080`));