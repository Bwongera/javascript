const input = document.getElementById("display")

function appendValue(value){
    if (input.value === "0") {
        input.value = ""
    }
    input.value += value;
}

function clearDisplayed(){
    input.value = "0";
}

function deleteLast(){
    input.value = input.value.slice(0,-1)
    if (input.value === ""){
        input.value = "0";
    }
}

function calculator() {
    try {
        input.value = eval(input.value)

    } catch (error) {
        console.log(error)
        input.value = `Error is : ${error}`
    }
}

function percentage() {
    input.value = Number(input.value) / 100;
}





// const input = document.getElementById("name");
// const button = document.getElementById("btn");
// const result = document.getElementById("result");

// button.addEventListener("click", function () {

//     const name = input.value.trim();

//     if (name === "") {
//         result.textContent = "Please enter your name.";
//         return;
//     }

//     result.textContent = `Hello, ${name}!`;

// });