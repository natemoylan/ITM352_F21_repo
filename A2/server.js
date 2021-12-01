const qs = require('qs'); // Use variable 'qs' (query String) as the loaded module
var express = require('express'); // Loads the Express module
var app = express(); // Starts & places Express module to variable 'app'
var myParser = require("body-parser"); // Grants access to POST data and loads the body-parser module

var filename = 'user_data.json'; // Creates a variable with the file name user_data.json
var fs = require('fs'); // Loads/ starts up fs system actions
const{request} = require('express');

app.all('*', function (req, res, next) { // Links to my request POST
    console.log(req.method + ' to ' + req.path); // Write the request method in the console and path
    next(); // Continue
});

app.use(myParser.urlencoded({ extended: true })); // Retrieves the data from body

if(fs.existsSync(filename)) {
    stats = fs.statSync(filename)
    // Load in the user_data file to user_data object!
    console.log(filename + ' has ' + stats.size + ' characters!');
    // Outputs in terminal how many characters or the size of my user data file
    data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
} else {
    console.log(filename + ' does not exist!');
}


/* Processing Registration */
// -------------- Processing Registration ------------- // 
// Borrowed and modified from Lab 14 //
app.post("/process_register", function (req, res) {
    qstr = req.body
    console.log(qstr);
    var errors = [];
        if (/^[A-Za-z]+$/.test(req.body.name)) { // Only allows letters to be used for full names
        }
        else {
            errors.push('Use Only Letters for Full Name')
        }
        // Validate whether or not it is a full name
        if (req.body.name == "") {
            errors.push('Invalid Full Name');
        }
// Full name character length should be between 0 and 30 
        if ((req.body.fullname.length > 30 && req.body.fullname.length <0)) {
            errors.push('Full Name Too Long')
        }
// Checks the new username in lowercase across other usernames
    var userreg = req.body.username.toLowerCase(); 
        if (typeof user_data[userreg] != 'undefined') { // Gives error if username is taken and displays message 'Username taken'
            errors.push('Username taken')
        }
        // Requires usernames to be letters and numbers 
        if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
        }
        else {
            errors.push('Letters And Numbers Only for Username')
        }
// ------------------------ E-Mail Validation ------------------------ //
// NOTE: The following code will also retain the query string with the order quantities if the user decides to register as a new member from the login page
// Borrowed and modified from Lab 14 // 
    // Password must be at least 6 characters // 
        if (req.body.password.length < 6) {
            errors.push('Password Minimum 6 Characters')
        }
        // Checks to see that the password was entered correctly both times
        if (req.body.password !== req.body.repeat_password) { 
            errors.push('Password Not a Match')
        }
// Borrowed and modified from Lab 14 // 
    // If no errors are present, save username
    // This code also makes the user's fullname, username, and email sticky if there is an error so they don't to retype everything
    req.query.fullname = req.body.fullname;
    req.query.username = req.body.username;
    req.query.email = req.body.email; 
        if (errors.length == 0) {
            console.log('no errors')
            var username = req.body.username;
            user_data[username] = {}; // Register it as user's information
            user_data[username].name = req.body.fullname;
            user_data[username].password= req.body.password; 
            user_data[username].email = req.body.email; 
            data = JSON.stringify(user_data);  // Set as user's information
            fs.writeFileSync(filename, data, "utf-8");
            res.redirect('./invoice.html?' + qs.stringify(req.query));
        }
// Borrowed and modified from Lab 14 // 
    // If errors are present, log the user into the console, redirect to registration page
        else {
            console.log(errors)
// Redirect to registration page if error is present
    req.query.errors = errors.join(';');
    res.redirect('register.html?' + qs.stringify(req.query));
    }
});



app.use(express.static('./public')); 
app.listen(8080, () => console.log(`listening on port 8080`)); // Request and instructs to listen on port 8080