function GreetingMessage() {
    return "Hello my baby boy"

}
console.log(GreetingMessage());

function addElement() {
    const number = [1, 2, 3, 4, 5];
    number.push(6)
    return number;

}
console.log(addElement())

function greetUser() {
    return "Hello, John ?"
}

console.log(greetUser())


function greetUsers() {
    const personalName = 'Ngabo'
    function getName() {
        return personalName
    }
    const sentence = `Hello ${personalName}? Welcome to Javascript`
    return sentence

}
console.log(greetUsers())

function multiply() {
    const a = 4
    const b = 5
    return a * b;

}
console.log(multiply())

function multiplys(a, b, c) {
    return a * b / c;
}
console.log(multiplys(4, 5, 2))


function userData(name, email, phone, id) {
    const user = {
        Names: name,
        Email: email,
        PhoneNumber: phone,
        ID: id
    }
    return user

}
console.log(userData("John Ngabonziza", "John@gmail.com", "0782512832", 21991))


function divide() {
    const x = 2000
    const z = 2026
    return x - z;

}
console.log(divide())

function calculateTotal(price) {
    function calculatTax() {
        const tax = price * 10 / 100
        return tax
    }

    return price + calculatTax()
}
console.log(calculateTotal(100))

function checkGrade(mark) {
    if (mark >= 80) {
        return 'A'
    } else if (mark >= 70 && mark <= 79) {
        return 'B'
    }
    else if (mark >= 60 && mark <= 69) {
        return 'C'
    } else if (mark <= 60) {
        return 'D'
    }
    return getGrade()
}
console.log(checkGrade(90))
console.log(checkGrade(20))
console.log(checkGrade(65))
console.log(checkGrade(32))
