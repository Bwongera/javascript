

// const message = "HELLO WORLD";
// console.log(message);

// const number = 30;
// console.log(number);

// const message2 = "HELLO CLASS";
// console.log(message2);

// const information = ["car", true, 50, Date("09-07-2026"), "banana"];

// console.log(information);

// const product =
// {
//     name: "Laptop",
//     price: 1000000,
//     available: true
// }


// console.log(product);

// const people = [

//     { name: "Ishimwe", age: 30 },
//     { name: "Jeanne", age: 25 },
//     { name: "Claude", age: 27 }
// ];
// console.log(people);



// const families = [
//     {
//         name: "Ngabo",
//         gender: "Male",
//         married: false,
//         location: { country: "Rwanda", city: "Kigali", district: "Gasabo" },
//         children: [
//             { name: "Kevin", age: 10, gender: "Male" },
//             { name: "Yvan", age: 8, gender: "Male" }
//         ]
//     },
//     {
//         name: "Sarah",
//         gender: "Female",
//         married: true,
//         location: { country: "Kenya", city: "Nairobi", district: "Westlands" },
//         children: [
//             { name: "Emma", age: 6, gender: "Female" }
//         ]
//     }
// ];

// console.log(families);

// const fruits = ["Banana", "Orange", "Apple", "Mango"]
// const size = fruits.length
// console.log(size);


// let courses = ["Figma", "Linux", "HTML", "CSS", "JavaScript"]
// console.log(courses)

// courses.push("Git")
// console.log(courses)

// courses.pop()
// console.log(courses)

// courses.unshift("Git")
// console.log(courses)

// courses.shift()
// console.log(courses)

// console.log(courses.length)


// console.log(courses.join(" | "))


// function displayCourses(coursesArray) {
//     return courses
// }
// console.log(displayCourses(courses))


// function displayCourses(allCourses) {
//     console.log(allCourses);
//    return allCourses
// }
// displayCourses(courses)

// const words = [ 'Hey', "I'm", 'John', 'a', 'good', 'student.']
// const sentence = words.join(" ")
// console.log(sentence)




// const students15= [
//   'Manzi Mugisha',
//   'Delphine',
//   'Bikorimana',
//   'Claude',
//   'Elie',
//   'Egide',
//   'Justin',
//   'Grace',
//   'Opera',
//   'Jouyeuse',
//   'Sammy',
//   'Bukuru',
//   'Frank',
//   'Mutoni',
//   'John',
//   'Imani',
//   'Edmon',
//   'Fiston',
//   'Clemence',
//   'Faustin'
// ]
// console.log( '1.','Manzi', '2.','Delphine', '3.','Bikorimana', '4.','Claude', '5.','Elie', '6.','Egide', '7.','Justin','8.','Grace', '9.','Mutoni', '10.','Opera','11.','Jouyeuse', '12.','Sammy', '13.','Bukuru', '14.','Frank','15.','John');

// console.log("0.",students[0]);
// console.log("1.",students[1]);
// console.log("2.",students[2]);
// console.log("3.",students[3]);
// console.log("4.",students[4]);
// console.log("5.",students[5]);
// console.log("6.",students[6]);
// console.log("7.",students[7]);
// console.log("8.",students[8]);
// console.log("9.",students[9]);
// console.log("10.",students[10]);
// console.log("11.",students[11]);
// console.log("12.",students[12]);
// console.log("13.",students[13]);
// console.log("14.",students[14]);

// for loop method(initialization; condition; action)


// for( let index = 0; index < students.length; index++) {
// const number = index + 1;
// const eachStudent = students[index]
// console.log(`${number}. ${eachStudent}`);

// }


// let products = [
//     'Sugar',
//     'Rice',
//     'Liquid Soap',
//     'Cooking Oil',
//     'Milk',
//     'Bread',
//     'Eggs',
//     'Tea'

// ]
// // console.log(products)

// let prices = [
// 'Rw 4,000',
// 'Rw 2,500',
// 'Rw 2,100',
// 'Rw 7,000',
// 'Rw 1,500',
// 'Rw 5,00',
// 'Rw 3,200',
// 'Rw 2,000'


// ]

// for(let index = 0; index < products.length; index++){
//     console.log(`${index+1}.${products[index]} = ${prices[index]}`)
// }



// let products = [
//   'Sugar',
//   'Rice',
//   'Liquid Soap',
//   'Cooking Oil',
//   'Milk',
//   'Bread',
//   'Eggs',
//   'Tea'
// ];

// let prices = [
//   4000,
//   2500,
//   2100,
//   7000,
//   1500,
//   500,
//   3200,
//   2000
// ];

// let total = 0;

// for (let i = 0; i < prices.length; i++) {
//     console.log(`${i + 1}. ${products[i]} = RWF ${prices[i]}`);
//     total += prices[i];
// }

// console.log("--------------------");
// console.log(`Total: Rw ${total}`);



// const CorrectPassword = '123@2024';
// const passwords = ['123@2020', '123@2021', '123@2022', '123@2023', '123@2024', '123@2025', '123@2026']

// let index = 0;
// while (passwords[index] !== CorrectPassword) {
//   console.log(`Incorrect Password: ${passwords[index]}`);
//   index++
// }
// console.log(`Correct Password: ${CorrectPassword}`);



// const seats = [
//   'reserved',
//   'available',
//   'occupied',
//   'reserved',
//   'reserved',
//   'reserved'

// ]
// let index = 0;

// while (seats[index] !== 'available') {
//   console.log(`Checking seat ${index + 1} : ${seats[index]}`);
//   index++;
// }
// console.log(`Seat ${index + 1} is available. Booking can proceed`)
// console.log(`Found an available seat after checking ${index + 1} seats.`)



// const students = [
//   'Manzi Mugisha',
//   'Delphine',
//   'Bikorimana',
//   'Claude',
//   'Elie',
//   'Egide',
//   'Justin',
//   'Grace',
//   'Opera',
//   'Jouyeuse',
//   'Sammy',
//   'Bukuru',
//   'Frank',
//   'Mutoni',
//   'John'
// ]
// //For Loop
// //While Loop
// //For Each Loop


// students.forEach((student, index) => {
//   console.log(`${index + 1}. ${student}`)
// })





// const seats = [
//   { owner: "MANZI", price: '$100', category: "VVIP", status: "OCCUPIED" },
//   { owner: "MUTONI", price: '$25', category: "REGULAR", status: "RESERVED" },
//   { owner: "EGIDE", price: '$50', category: "VIP", status: "RESERVED" },
//   { owner: null, price: '$100', category: "VVIP", status: "AVAILABLE" },
//   { owner: "JUSTIN", price: '$25', category: "REGULAR", status: "OCCUPIED" },
// ];

// let personMessage;
// let seatMessage;

// seats.forEach((seat, index) => {
//   if (seat.owner === 'MANZI') {
//     personMessage = `Hey Jose, ${seat.owner} already entered and his in ${seat.category} of ${seat.price}.`
//   }
//   if (seat.status === "AVAILABLE") {
//     seatMessage = `Please check the seat ${index + 1} is ${seat.status}.`
//   }

// })

// console.log(`${personMessage} ${seatMessage}`)



// const seats = [
//   { owner: "MANZI", price: 100, category: "VVIP", status: "OCCUPIED" },
//   { owner: "MUTONI", price: 25, category: "REGULAR", status: "RESERVED" },
//   { owner: "EGIDE", price: 50, category: "VIP", status: "RESERVED" },
//   { owner: null, price: 100, category: "VVIP", status: "AVAILABLE" },
//   { owner: "JUSTIN", price: 25, category: "REGULAR", status: "OCCUPIED" },
// ];

// let totalPrice = 0;
// seats.forEach((seat) =>{
//   if (seat.status !== 'AVAILABLE'){
//     totalPrice = totalPrice + seat.price
//   }
// });
// console.log(`$${totalPrice}`);



// const names = [
//   'MANZI',
//   'DELPHINE',
//   'BIKORIMANA',
//   'CLAUDE',
//   'ELIE',
//   'EGIDE',
//   'JUSTIN',
//   'GRACE',
//   'OPERA',
//   'JOSE',
//   'SAMMY',
//   'BUKURU',
//   'FRANK',
//   'MUTONI',
//   'JOHN'
// ]

// names.map((name, index) =>{
//   console.log('Welcome', " ", name , '', 'to' , 'the coding school.')
// })


// const students = [
//   { name: 'JOHN', marks: 90 },
//   { name: 'OPERA', marks: 85 },
//   { name: 'JOSE', marks: 87 },
//   { name: 'SANDRA', marks: 80 },
//   { name: 'SAMMY', marks: 75 }
// ]
// // marks.map((mark, index) => {
// //   console.log(`${index + 1}. ${mark.name},`)
// // });

// const updateMarks = students.map((student) => {
//   return { name: student.name, marks: `${student.marks}/100`, comment: '' }
// });

// console.log(updateMarks);



// const presidents = [
//     {
//         name: "Paul Kagame",
//         country: "Rwanda"
//     },
//     {
//         name: "William Ruto",
//         country: "Kenya"
//     },
//     {
//         name: "Yoweri Museveni",
//         country: "Uganda"
//     },
//     {
//         name: "Samia Suluhu Hassan",
//         country: "Tanzania"
//     },
//     {
//         name: "Dusenge Sammy",
//         country: "Kigali"
//     }
// ];
      
// for (let index = 0; index < presidents.length; index++) {
//     console.log(`${index + 1}. President ${presidents[index].name}, Country: ${presidents[index].country}.`);}
       
