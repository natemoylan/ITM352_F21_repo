var fs = require('fs');
var filename = "./user_data.json";

// Reads file system 
    //data = fs.readFileSync(filename, 'utf-8');

//Parses data into json 
    //user_data = JSON.parse(data);
    //console.log("User_data=", user_data);

user_data = require(filename);
console.log("User_data = ", user_data);
