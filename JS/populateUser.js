
const tableBody = document.querySelector("tbody")

async function fetchUsers() {
try {
   const response = await fetch("https://fakestoreapi.com/users") 
   const users = await response.json()

users.map((user,index)=>{
const tableRow = document.createElement('tr')
tableRow.innerHTML = `
<td>${index +1}</td>
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
  }  catch(error)  {
        console.log(`Error is :${error}`)
    }

}
   fetchUsers()

 async function updateUser(user){

      console.log('Default user:',user)

      const updateUserForm = document.createElement("form")
      updateUserForm.innerHTML = `
      <h1 >Update User</h1>
      <input class='form-input' type='text' value=${user.name.firstname} />
      <input class='form-input' type='text' value=${user.name.lastname} />
      <input class='form-input' type='text' value=${user.username} />
      <input class='form-input' type='text' value=${user.address.city} />

      <div>
      <button class='form-button' style="background: red;">Cancel</button>
      <button class='form-button' style="background: blue;">Update</button>
      </div>

      `

      document.body.appendChild(updateUserForm)
   }





































// const tableBody = document.querySelector("tbody");

// async function fetchUsers() {
//   try {
//     const response = await fetch("https://fakestoreapi.com/users");
//     const users = await response.json();

//     users.map((user, index) => {
//       const tableRow = document.createElement("tr");

//       tableRow.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${user.name.firstname}</td>
//         <td>${user.name.lastname}</td>
//         <td>${user.email}</td>
//         <td>${user.username}</td>
//         <td>${user.address.city}</td>

//         <td><button class="edit-btn"><i class="fa-solid fa-pen" style="color: rgb(0, 255, 0);"></i></button>
//           <button class="delete-btn"><i class="fa-solid fa-trash" style="color: rgb(255, 0, 0);"></i></button>
//         </td>
//       `;

//       const editButton = tableRow.querySelector(".edit-btn");
//       editButton.addEventListener("click", () => {
//         updateUser(user);
//       });
//       const deleteButton = tableRow.querySelector(".delete-btn");

//       deleteButton.addEventListener("click", () => {
//         tableRow.remove();
//       });

//       tableBody.appendChild(tableRow);
//     });

//   } catch (error) {
//     console.log(`Error is: ${error}`);
//   }
// }

// fetchUsers();


// function updateUser(user) {

//   console.log("Default user:", user);

//   const updateUserForm = document.createElement("form");

//   updateUserForm.innerHTML = `
//     <h1>Update User</h1>

//     <input class="form-input" type="text"  value="${user.name.firstname}"  placeholder="First Name"/>
//     <input  class="form-input"  type="text"  value="${user.name.lastname}"  placeholder="Last Name"/>
//     <input class="form-input" type="text" value="${user.username}" placeholder="Username"/>
//     <input class="form-input" type="text" value="${user.address.city}"  placeholder="City"/>

//     <div>
//       <button type="button" class="form-button cancel-btn">Cancel</button>
//       <button type="submit" class="form-button">Update</button>
//     </div>
//   `;

//   document.body.appendChild(updateUserForm);

//   const cancelButton = updateUserForm.querySelector(".cancel-btn");

//   cancelButton.addEventListener("click", () => {
//     updateUserForm.remove();
//   });

//   updateUserForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const inputs = updateUserForm.querySelectorAll(".form-input");

//     user.name.firstname = inputs[0].value;
//     user.name.lastname = inputs[1].value;
//     user.username = inputs[2].value;
//     user.address.city = inputs[3].value;

//     console.log("Updated user:", user);

//     updateUserForm.remove();
//   });
// }

   

  