/*
filename: navigationBar.js
authors: Peter Rivera-Concannon & Nate Moylan
*/

// This function makes a navigation bar from a products_data object

function nav_bar() {

    var cart_qty;
    loadJSON('Cart', function (res) {
        //to parse JSON into a string
        cart_qty = JSON.parse(res);
    });

    //------------------------------------To create the nav_bar-------------------------------------------//
    document.write(`
        <ul>
            <li style="float:left"><a href="./public/index.html"> UH Manoa Online Athletics Store </a></li>
            <br>
            <li style="float:left"><a href="Cart${location.search}">Cart(${cart_qty.value})</a></li>
            <br>
            <li style="float:left"><a href="./index.html${location.search}">Products</a></li>


            <div class="dropdown-content">`);

            for(let prodtype in allProducts) {
                document.write(`<a href="products.html?product_key=${prodtype}">${prodtype}s</a><br>`)
            }
        



        /*
//---------to load the part of the nav_bar for login or logout depending if the user is logged in or not---------//
        if (getCookie("username") != "") {
            document.write(`
            <li style="float:left"><a href="logout">Logout ${getCookie("username")}</a></li>
            </ul>`);
        }else {
            document.write(`
                <li style="float:left"><a href="login">Login or Registration</a></li>
            </ul>`);
        }

        */
};
