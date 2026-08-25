
const tableBody = document.querySelector("tbody")

async function fetchUsers() {
try {
   const response = await fetch("https://fakestoreapi.com/users") 
   const users = await response.json()

users.map((user,index)=>{
const tableRow = document.createElement('tr')
tableRow.innerHTML = `
<td>${index + 1}</td>
<td>${user.name.firstname}</td>
<td>${user.name.lastname}</td>
<td>${user.email}</td>
<td>${user.username}</td>
<td>${user.address.city}</td>

<button><i class="fa-solid fa-pen" style="color: rgb(0, 255, 0);"></i></button>
<button><i class="fa-solid fa-trash" style="color: rgb(255, 0, 0);"></i></button>

`
tableBody.appendChild(tableRow)
})
  }  catch(error){
        console.log(`Error is :${error}`)
    }

}
   fetchUsers()