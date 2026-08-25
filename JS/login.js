const loginForm = document.querySelector("#login-form")

const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")

const invaliMessage = document.getElementById("ivalid")

function Login (event){
    event.preventDefault()

    const users = JSON.parse(localStorage.getItem("users"))
    const user = users.find((user)=>user.email === inputEmail.value)

    if(!user){
       invaliMessage.innerHTML = "Invalid email or password"
       return
    }
   if(user.password !== inputPassword.value){
      invaliMessage.innerHTML = "Invalid email or password"
      return
   }

   localStorage.setItem("logedIn",JSON.stringify(user))
   localStorage.setItem("logedIn",true)

   alert("Login successfuly")
}

loginForm.addEventListener("submit", Login)