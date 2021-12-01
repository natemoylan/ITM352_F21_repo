var fs = require ('fs');

var filename = 'user_data.json';

var user_data = require('./user_data.json');
console.log(user_data['dport']['password']);

data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
    console.log ("User Data is: ", user_data);

var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8'));
console.log(user_data);
