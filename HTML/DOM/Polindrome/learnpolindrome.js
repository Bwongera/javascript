const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

button.addEventListener("click", function () {
    let text = input.value;

    if (text === "") {
        result.textContent = "Please enter a word or sentence.";
        return;
    }

    let cleanedText = text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    let reversedText = cleanedText.split("").reverse().join("");

    if (cleanedText === reversedText) {
        result.textContent = `"${text}" is a palindrome ✅`;
    } else {
        result.textContent = `"${text}" is not a palindrome ❌`;
    }
});