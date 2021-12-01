var fs = require ('fs');
var filename = "./user_data.json"
const {exit} = require('process');

if (fs.existsSync(filename)) {

    data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(data);
    console.log ("User Data is: ", user_data);

    fileStats = fs.statSync(filename);
    console.log('File ' + filename + ' has ' + fileStats.size + ' characters.');

} else {
    console.log('Wrong File Stupid!')
    exit ('Exiting Program');
};
