function convertTemp (tempIn, units) {
    // Function to convert temperatures from C to F and F to C 
    // tempIn is the temp you wish to convert in either units

    if (units == "F") {
        return (tempIn - 32) * 5/9;
    } else if (units == "C"){
        return (tempIn * 9/5) + 32;
    } else {
        return NaN;
    }
    
}

/*
    console.log("0 C =", convertTemp(0, "C"));
    console.log("212 F=", convertTemp(212, "F"));
    console.log("Bad Input =", convertTemp(12, "Q"));
*/

var attributes = "5; -3; 0; xxx; 7.5; 13";
var pieces = attributes.split(";");

function isNonNegInt(inputstring, returnErrors = false) {
    // Validate that an input value is a non negative integer
    // inputstring is the input string; returnErrors indicates how the function returns
    // true means return the array. Flase means return a boolean. 
    
    errors = []; // assume no errors at first
    if(Number(inputstring) != inputstring) errors.push('Not a number!'); // Check if string is a number value
    if(inputstring < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(inputstring) != inputstring) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

/*
    for (testVal in pieces) {
        console.log(testVal + ": " + pieces[testVal] + " " + isNonNegInt(pieces[testVal], true));
}*/

// Callback function to check whether array elements are nonNegInt
function checkIt(elem, index){
    console.log(`${index}: ${elem} ${(isNonNegInt(elem) ? 'a' : 'not a')} valid quantity`);
}

// Apply checkIt to pieces array
pieces.forEach(checkIt);

console.log("=====");

pieces.forEach( (elem, index) => {console.log(`${index}: ${elem} ${(isNonNegInt(elem) ? 'a' : 'not a')} valid quantity`);})