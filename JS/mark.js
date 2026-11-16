
const form = document.getElementById("Enter-mark-form");

const marksInput = document.getElementById("marks");

const result = document.getElementById("result");

const resultContainer = document.getElementById("result-container");

// Submit Form
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const marks = Number(marksInput.value);

    // Clear previous result classes
    resultContainer.className = "result-container";

    // Check empty input
    if (marksInput.value.trim() === "") {

        result.textContent = "Please enter your marks!";
        resultContainer.classList.add("error");

    }

    // Check invalid marks
    else if (marks < 0 || marks > 100) {

        result.textContent = "Marks must be between 0 and 100!";
        resultContainer.classList.add("error");

    }

    // Excellent
    else if (marks >= 85) {

        result.textContent = "Excellent! 🎉";
        resultContainer.classList.add("excellent");

    }

    // Good
    else if (marks >= 50) {

        result.textContent = "Good! 👍";
        resultContainer.classList.add("good");

    }

    // Fail
    else {

        result.textContent = "Fail! Try again. ❌";
        resultContainer.classList.add("fail");

    }

});
