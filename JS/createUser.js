const signUpForm = document.querySelector("#signup-form")

const username = document.querySelector("#userName").value
const email = document.querySelector("#email").value
const password = document.querySelector("#password").value

async function signUp(event) {
    event.preventDefault()

   try{
 const response = await fetch("https://fakestoreapi.com/users",{
       method:`POST`,
       header:{
        "Content-Type":"application/json"

       }, 
       body:JSON.stringify((username,email,password))
    })
    const data = await response.json()
    console.log(data)
    alert("user successfuly register")
   }catch (error){
    console.log`${error}`
   }
}


signUpForm.addEventListener("submit",signUp)