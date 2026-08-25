const display = document.getElementById("display");

function appendValue(value) {
 display.value += value;

}

function clearDisplay() {

    display.value = "";

}

function deleteLast() {

    display.value = display.value.slice(0, -1);

}

function calculate() {

    try {

        if (display.value === "") {
            return;
        }

        let expression = display.value;

        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        display.value = eval(expression);

    } catch (error) {

        display.value = "Error";

    }

}

function showCalculator(calculatorId, event) {

    const sections =
        document.querySelectorAll(".calculator-section");

    const tabs =
        document.querySelectorAll(".tab");


    sections.forEach(section => {

        section.classList.remove("active");

    });


    tabs.forEach(tab => {

        tab.classList.remove("active");

    });


    document
        .getElementById(calculatorId)
        .classList.add("active");


    event.target.classList.add("active");

}

function calculateLoan() {

    const amount =
        Number(
            document.getElementById("loanAmount").value
        );


    const annualRate =
        Number(
            document.getElementById("interestRate").value
        );


    const months =
        Number(
            document.getElementById("loanMonths").value
        );


    const result =
        document.getElementById("loanResult");


    if (
        amount <= 0 ||
        annualRate < 0 ||
        months <= 0
    ) {

        result.textContent =
            "Please enter valid information.";

        return;

    }


    const monthlyRate =
        annualRate / 100 / 12;


    let monthlyPayment;


    if (monthlyRate === 0) {

        monthlyPayment =
            amount / months;

    } else {

        monthlyPayment =
            amount *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );

    }


    const totalPayment =
        monthlyPayment * months;


    const totalInterest =
        totalPayment - amount;


    result.innerHTML = `
        Monthly Payment:
        ${monthlyPayment.toFixed(2)}
        <br>

        Total Payment:
        ${totalPayment.toFixed(2)}
        <br>

        Total Interest:
        ${totalInterest.toFixed(2)}
    `;

}

function calculateGrade() {

    const name =
        document
            .getElementById("studentName")
            .value
            .trim();


    const score1 =
        Number(
            document.getElementById("subject1").value
        );


    const score2 =
        Number(
            document.getElementById("subject2").value
        );


    const score3 =
        Number(
            document.getElementById("subject3").value
        );


    const result =
        document.getElementById("gradeResult");


    if (
        name === "" ||

        isNaN(score1) ||
        isNaN(score2) ||
        isNaN(score3) ||

        score1 < 0 ||
        score1 > 100 ||

        score2 < 0 ||
        score2 > 100 ||

        score3 < 0 ||
        score3 > 100
    ) {

        result.textContent =
            "Please enter valid information.";

        return;

    }


    const average =
        (score1 + score2 + score3) / 3;


    let grade;


    if (average >= 80) {

        grade = "A";

    } else if (average >= 70) {

        grade = "B";

    } else if (average >= 60) {

        grade = "C";

    } else if (average >= 50) {

        grade = "D";

    } else {

        grade = "F";

    }


    result.innerHTML = `
        Student:
        ${name}
        <br>

        Average:
        ${average.toFixed(2)}
        <br>

        Grade:
        ${grade}
    `;

}

function calculatePercentage() {

    const percentage =
        Number(
            document.getElementById("percentage").value
        );


    const number =
        Number(
            document.getElementById("number").value
        );


    const result =
        document.getElementById("percentageResult");


    if (
        isNaN(percentage) ||
        isNaN(number) ||
        percentage < 0
    ) {

        result.textContent =
            "Please enter valid numbers.";

        return;

    }


    const answer =
        (percentage / 100) * number;


    result.innerHTML = `
        ${percentage}% of ${number} =
        ${answer}
    `;

}