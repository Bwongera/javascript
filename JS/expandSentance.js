
const input = document.getElementById("name");
const button = document.getElementById("btn");
const result = document.getElementById("result");

button.addEventListener("click", function () {

    const name = input.value;

    if (name === "") {
        result.textContent = "Please enter your name.";
        return;
    }

    result.textContent = `Hello, ${name}!`;

});