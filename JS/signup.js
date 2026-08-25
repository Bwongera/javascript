const signUpForm = document.querySelector("#signup-form")

const inputFirstName = document.getElementById("first-name")
const inputLasttName = document.getElementById("last-name")
const inputEmail = document.getElementById("email")
const inputPhone = document.getElementById("phone")
const inputPassword = document.getElementById("password")

const firstNameValidation = document.getElementById("first-name-validation")
const emailValidation = document.getElementById("email-validation")
const phoneValidation = document.getElementById("phone-validation")
const passwordValidation = document.getElementById("password-validation")

function signUp(event){
    event.preventDefault()

    if(inputFirstName.value==="" && inputLasttName.value==="" && inputEmail.value==="" && inputPhone.value==="" && inputPassword.value === ""){
     alert("Please all input is required")
     return
    }

    if(inputFirstName.value !== inputFirstName.value.charAt(0).toUpperCase()+ inputFirstName.value.slice(1)){
        firstNameValidation.innerHTML="Put your first name with upper case"
        return
    }
    
    if(!inputEmail.value.includes("@")){
        emailValidation.innerHTML="Invalid email"
        return
    }

    if(inputPhone.value.length !== 13 || !inputPhone.value.startsWith("+2507")){
        phoneValidation.innerHTML = "Invalid phone number"
        return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(inputPassword.value)){
        passwordValidation.innerHTML = "Password must be at least 8 characters, with uppercase, lowercase and numbers.";
        return
    }

    const data = {
        firstName: inputFirstName.value,
        lastName: inputLasttName.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        password: inputPassword.value

    }

    try{
        let users = JSON.parse(localStorage.getItem("users")) || []
        users.push(data)
        localStorage.setItem("users", JSON.stringify(users))
        alert("User successfuly registed")
        signUpForm.reset();
    } catch (error) {
        console.log(`Error is: ${error}`)
    }
}
signUpForm.addEventListener("submit", signUp)