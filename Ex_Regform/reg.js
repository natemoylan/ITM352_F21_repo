const form = document.querySelector('#create-acc-form');
const fullNameInput = document.querySelector('#fullname');
const usernameInput = document.querySelector ('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#password2');

// When submit button is pressed, this addEventListener will activate with all the functions within
form.addEventListener('submit', (event)=>{
    event.preventDefault();

    validateForm();
});


function validateForm(){
    //FullName
    //Checks if there is something within the txtbox
    if(fullNameInput.value.trim() == ''){
        //Calls the setError function
        setError(fullNameInput, 'Name can not be empty');
    } else if (fullNameInput.value.trim().length > 30){ //Checks if name inputed is less than 30 character, if call setError
        setError (fullNameInput, 'Name must be below 30 characters')
    } else {
        //Calls the setSuccess function if validated
        setSucess(fullNameInput);
    }

    //Username
    //Checks if there is something within the txtbox
    if(usernameInput.value.trim() == ''){
        //Calls the setError function
        setError(usernameInput, 'Username can not be empty');
    } else if (usernameInput.value.trim().length < 4 || usernameInput.value.trim().length > 10){
        setError(usernameInput, 'Username must be between 4 and 10 characters')
    } else{
        //Calls the setSuccess function if validated
        setSucess(usernameInput)
    }


    //Email
    //Checks if there is something within the txtbox
    if(emailInput.value.trim() == ''){
        //Calls the setError function
        setError(emailInput, 'Enter Email Address');
    }

    //Password
    //Checks if there is something within the txtbox
    if(passwordInput.value.trim() == ''){
        //Calls the setError function
        setError(passwordInput, 'Password can not be empty');
    } else if (passwordInput.value.trim().length < 6) {
        setError(passwordInput, 'Password must be longer than 6 characters')
    } else {
        //Calls the setSuccess function if validated
        setSucess(passwordInput)
    }

    //Confirm Password
    if(confirmPasswordInput.value.trim() == ''){
        //Calls the setError function
        setError(confirmPasswordInput, 'Password can not be empty');
    } else if (confirmPasswordInput.value != passwordInput.value){
        setError(confirmPasswordInput, 'Passwords must match')
    } else {
        setSucess (confirmPasswordInput)
    }
}

// This function obtains the parent directory within each category and adds errors 
function setError (element, errorMessage){
    // Calls the parent info within each category
    const parent = element.parentElement;
    // Remove success if parent has success class, if so remove it
    if (parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    // Calls the paragraph tag within each category to display the error
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

// This function obtains the parent directory within each category and adds errors 
function setSucess (element){
    // Calls the parent info within each category
    const parent = element.parentElement;
    // Remove error if parent has error class, if so remove it
    if (parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}


