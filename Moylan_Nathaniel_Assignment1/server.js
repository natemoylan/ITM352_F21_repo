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
            if (typeof req.query['purchase_submit'] != 'undefined') {
        
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
                
                console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));
            }
            next();
        }
        
        return str;
    }
});

app.post("/process_invoice", function (request, response, next) {
    let POST = request.body;
    if(typeof POST['purchase_submit'] == 'undefined') { // Checks if there is a quantity in the txtbox
        console.log('No purchase form data'); // Sends message to user
        next();
    } 

    console.log(Date.now() + ': Purchase made from ip ' + request.ip + ' data: ' + JSON.stringify(POST));

    var contents = fs.readFileSync('./public/invoice.html', 'utf8');
    response.send(eval('`' + contents + '`')); // render template string

    function display_invoice_table_rows() {
        subtotal = 0;
        str = '';
        for (i = 0; i < products.length; i++) {
            a_qty = params.get(`quantity${i}`);
            if(typeof POST[`quantity${i}`] != 'undefined') {
                a_qty = POST[`quantity${i}`];
            }
            if (a_qty > 0) {
                // product row
                extended_price =a_qty * products[i].price
                subtotal += extended_price;
                str += (`
      <tr>
        <td width="43%">${products[i].brand}</td>
        <td align="center" width="11%">${a_qty}</td>
        <td width="13%">\$${products[i].price}</td>
        <td width="54%">\$${extended_price}</td>
      </tr>
      `);
            }
        }        

        // Compute tax
        tax_rate = 0.0575;
        tax = tax_rate * subtotal;

        // Compute shipping
        if (subtotal <= 50) {
            shipping = 2;
        }
        else if (subtotal <= 100) {
            shipping = 5;
        }
        else {
            shipping = 0.05 * subtotal; // 5% of subtotal
        }

        // Compute grand total
        total = subtotal + tax + shipping;
        
        return str;
    }

});













app.use(express.static('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });