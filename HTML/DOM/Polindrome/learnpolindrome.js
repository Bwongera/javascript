
const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");

function checkPalindrome() {
    const text = input.value.trim();

    if (!text) {
        result.textContent = "Hey!! Insert text to check.";
        result.style.color = "red";
        return;
    }

    if (text.length < 3) {
        result.textContent = "Hey !! Text should contains at least 3 characters.";
        result.style.color = "red";
        return;
    }

    const cleaned = text
        // .toLowerCase()
       .replace(/[^a-zA-Z]/g, " ")
        .trim();

    const reversed = cleaned.split("").reverse().join("");

    result.style.color = "#333";

    if (cleaned === reversed) {
        result.textContent = cleaned + " is a Palindrome.";
        result.style.color = "green";
    } else {
        result.textContent = cleaned + " is not a Palindrome.";
         

    }
}

input.addEventListener("input", () => {
    result.textContent = "Not checked yet!!";
    result.style.color = "#333";
});

button.addEventListener("click", checkPalindrome);
