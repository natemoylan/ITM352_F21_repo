// This server was a combination of the labs and WODS and examples provided by Prof. Kazman. 

var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
var products = require("./public/products.js");
var app = express();

app.use(myParser.urlencoded({ extended: true }));

// Validate that an input value is a non negative integer
// inputstring is the input string; returnErrors indicates how the function returns
// true means return the array. Flase means return a boolean.    
function isNonNegInt(inputstring, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(inputstring) != inputstring) {
        errors.push('Not a number!'); // Check if string is a number value
    }
    else 
    {
        if(inputstring < 0) errors.push('Negative value!'); // Check if it is non-negative
        if(parseInt(inputstring) != inputstring) errors.push('Not an integer!'); // Check that it is an integer
    }           
    return returnErrors ? errors : (errors.length == 0);
} 

// Checks Quantity textbox for validation errors
function checkQuantityTextbox(theTextbox) {
    errors = isNonNegInt(theTextbox.value, true); // setting errors to isNonNegInt
    if (errors.length == 0) errors = ['You want:']; 
    if (theTextbox.value.trim() == '') errors = ['Please type quantity desired: '];
    document.getElementById(theTextbox.name + '_label').innerHTML = errors.join('<font color="red">, </font>');
}       


// Displays display_products.html on the browser to the client.
// GETS the display_products.html
app.get("/display_products", function (request, response) {
    var contents = fs.readFileSync('./views/display_products.html', 'utf8');
    response.send(eval('`' + body + '`')); // render template string

    // This function creates a for loop to generate the products for the page
    function display_products() {
        str = '';
        for (i = 0; i < products.length; i++) {
            str += `
            <section class ="items">
            <h2>${products[i].brand}</h2>
            <h3 label id ="quantity_available${i}"><i>Available: ${products[i].quantity_available} in stock!</i></h3></label>
            <h4>$${products[i].price.toFixed(2)}</h4>
            <img src="./images/${products[i].image}" class="img">
            <label id ="quantity${i}_label">Number of Items: </label>
            <input type="text" placeholder="0" name="quantity${i}" onkeyup="checkQuantityTextbox(this);"> 

            </section>`;
        }
        
        return str;
    }
});


app.use(express.static('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });