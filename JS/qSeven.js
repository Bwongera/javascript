const sendMessageForm = document.getElementById("contact-form")
const result = document.querySelector("p")
const messageTable = document.getElementById("message-table");

const inputName = document.getElementById("name")
const inputEmail = document.getElementById("email")
const textArea = document.getElementById("message")

const validateName = document.getElementById("validate-name")
const validateEmail = document.getElementById("validate-email")
const validateMessage = document.getElementById("validate-message")

sendMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (inputName.value === "") {
        validateName.innerHTML = 'Please enter your name'
    } else if (inputEmail.value === "") {
        validateEmail.innerHTML = 'Please enter your email'
    } else if (textArea.value === "") {
        validateMessage.innerHTML = 'Please enter your message'
    } else {
        const message = {
            names: inputName.value,
            email: inputEmail.value,
            message: textArea.value
        }
        let messages = JSON.parse(localStorage.getItem("messages")) || []
        messages.push(message)

        localStorage.setItem("messages", JSON.stringify(messages))
        result.innerHTML = "Your message successfull sent!";
        result.style.color = "green"

        sendMessageForm.reset();

    }
});

function getmessages() {
    let allMessages = localStorage.getItem("messages");

    if (!allMessages) {
        console.log("No user found");
        return;
    }

    let messages = JSON.parse(allMessages);
    console.log(messages)

    messages.forEach((messages, index) => {
        messageTable.innerHTML += `
      <tr>
      
      <td>${index + 1}</td>
      <td>${messages.names}</td>
      <td>${messages.email}</td>
      <td>${messages.message}</td>
      </tr>
      
       `;
    });
}

getmessages();