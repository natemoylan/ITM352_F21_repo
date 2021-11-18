// This server was a combination of the labs and WODS and examples provided by Prof. Kazman. 
// Borrowed from Lab 13
var express = require('express');
var myParser = require("body-parser");
const qs = require('qs'); // Use variable 'qs' (query String) as the loaded module
var app = express(); 
var fs = require('fs'); // Loads/ starts up fs system actions
const{request} = require('express');


var products = require('./public/products.js'); 
var querystring = require("querystring");

// Monitors requests
app.all('*', function (request, response, next) { // Links to my request POST
    console.log(request.method + ' to ' + request.path); // Write the request method in the console and path
    next(); // Continue
});



// Validate that an input value is a non negative integer
// inputstring is the input string; returnErrors indicates how the function returns
// true means return the array. Flase means return a boolean.    
function isNonNegInt(inputstring, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(inputstring) != inputstring) {
        errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    }
    else 
    {
        if (inputstring > 50) errors.push('<font color="red">Only 50 items in stock!</font>'); // Checks if qty is within the available products
        if (inputstring == 0) errors.push('<font color="red">Enter a Number!</font>') // Checks if it is a Number
        if(inputstring < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        if(parseInt(inputstring) != inputstring) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
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

app.use(myParser.urlencoded({ extended: true }));

// Displays the invoice.html to the client
// Since the purchase button acts as a GET request, it should be a app.post on the server 


app.post('/process_invoice', function (request, response, next) {
    var errors={};
    
        
     
    
    //if the data is valid, send them to the invoice, otherwise send them back to index
    if(Object.keys(errors).length == 0) {
        response.redirect('./invoice.html?'+ qs.stringify(request.body)); //move to invoice page if no errors
    }else{
        response.redirect('./index?'+ qs.stringify(request.body));
    }
    });





// Displays display_products.html on the browser to the client.
// GETS the display_products.html
app.get("/index", function (request, response, next) {
    var contents = fs.readFileSync('./views/index.html', 'utf8');
    response.send(eval('`' + body + '`')); // render template string

    // This function creates a for loop to generate the products for the page
    function display_products() {
        str = '';
        // loop to generate the products
        for (i = 0; i < products.length; i++) {
            str += `
            <section class ="item">
            <h2>${products[i].brand}</h2> 
            <h3 label id ="quantity_available${i}"><i>Available: ${products[i].quantity_available} in stock!</i></h3></label>
            <h4>$${products[i].price.toFixed(2)}</h4>
            <img src="./images/${products[i].image}" class="img">
            <label id ="quantity${i}_label">Number of Items: </label>
            <input type="text" placeholder="0" name="quantity${i}" onkeyup="checkQuantityTextbox(this);"> 

            </section>`;

            // Applies the NonNegInt and checkQuantityTextbox function to make sure the quantity inputted by the user is validated. 
            if (typeof request.query['purchase_submit'] != 'undefined') {
        
                for (i = 0; i < products.length; i++) {
                    if (params.has(`quantity${i}`)) {
                        a_qty = params.get(`quantity${i}`);
                        // make textboxes sticky in case of invalid data
                        product_selection_form[`quantity${i}`].value = a_qty;
                        total_qty += a_qty;
                        if (!isNonNegInt(a_qty)) {
                            has_errors = true; // oops, invalid quantity
                            checkQuantityTextbox(product_selection_form[`quantity${i}`]); // show where the error is
                        }
                    }
                }
                
                console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(request.query));
            }
            next();
        }
        
        return str;
    }
});
















app.use(express.static('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });