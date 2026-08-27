
const tableBody = document.querySelector("tbody")
let userId = undefined;

async function fetchUsers() {
   try {
      const response = await fetch("https://fakestoreapi.com/users")
      const users = await response.json()

      users.map((user) => {
         const tableRow = document.createElement('tr')
         tableRow.setAttribute("data-user-id", user.id)

         tableRow.innerHTML = `
<td>${user.id}</td>
<td>${user.name.firstname}</td>
<td>${user.name.lastname}</td>
<td>${user.email}</td>
<td>${user.username}</td>
<td>${user.address.city}</td>
<button onclick='updateUser(${JSON.stringify(user)})'><i class="fa-solid fa-pen" style="color: rgb(0, 255, 0);"></i></button>
<button onclick=(deleteUser(${user.id}))><i class="fa-solid fa-trash" style="color: rgb(255, 0, 0);"></i></button>

`
         tableBody.appendChild(tableRow)
      })
   } catch (error) {
      console.log(`Error is :${error}`)
   }

}

fetchUsers()

const updateUserForm = document.createElement("form")
updateUserForm.id = "updateModal";
updateUserForm.style.display = 'none'

updateUserForm.innerHTML = `
      <h1 >Update User</h1>
      <input class='form-input' id='firstName' type='text' />
      <input class='form-input' id='lastName' type='text' />
      <input class='form-input' id='userName' type='text' />
      <input class='form-input' id='address' type='text'  />

      <div>
      <button class='form-button' style="background: red;">Cancel</button>
      <button id='submit-button' class='form-button' style="background: blue;">Update</button>
      </div>

      `

document.body.appendChild(updateUserForm)

const submitButton = document.querySelector("#submit-button")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const userName = document.querySelector("#userName")
const address = document.querySelector("#address")

const updateUser = (user) => {
   updateUserForm.style.display = 'block'
   firstName.value = user.name.firstname
   lastName.value = user.name.lastname
   userName.value = user.username
   address.value = user.address.city
   userId = user.id
}

const submitForm = async () => {
   const data = {
      name: { firstname: firstName.value, lastname: lastName.value },
      username: userName.value,
      address: { city: address.value }

   }
   try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const updateUser = await response.json()
      console.log(updateUser);

      const tableRow = document.querySelector(`tr[data-user-id="${userId}"]`);
      tableRow.children[1].textContent = firstName.value
      tableRow.children[2].textContent = lastName.value
      tableRow.children[4].textContent = userName.value
      tableRow.children[5].textContent = address.value
      updateUserForm.style.display = 'none'

   } catch (error) {
      console.log(`Error is:${error}`)
   }
}

submitButton.addEventListener("click", function (event) {
   event.preventDefault();
   submitForm();

}
)

const deleteUser = async (userId) => {
   console.log(userId)

   try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, { method: "DELETE" })
      const deleteUser = await response.json()
      console.log(deleteUser);

      document.querySelector(`tr[data-user-id="${userId}"]`).remove();
      alert('User deleted successfuly.');

   } catch (error) {
      console.log(`Error is: ${error}`)
   }
}



