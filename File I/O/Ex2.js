var fs = require('fs');
var filename = "./user_data.json";

/* Another way of reading file system */

    // Reads file system 
        //data = fs.readFileSync(filename, 'utf-8');

    //Parses data into json 
        //user_data = JSON.parse(data);
        //console.log("User_data=", user_data);

//Checks if file exists
if(fs.existsSync(filename)){
    //Moved the require in here from Ex1
    user_data = require(filename);
    console.log("User_data = ", user_data);

    //Reads the stats of the file
    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename");
}

