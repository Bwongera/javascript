// let reword = [ 'Hey', "I'm", 'John', 'a', 'good', 'student.']
// let sentences = reword.join(" ")
// console.log(sentences)

// let women = [ 'Gisele', 'Clemence','Manzere','Judith']
// console.log(women)

// // console.log(women.length)

// women.push('Donatha')

// women.unshift()
// console.log(women)

// women.pop()
// console.log(women)

// women.shift()
// console.log(women)

// console.log(women.join(" , "))

// console.log(women.length)


// const Seat = [
//   'reserved',
//   'reserved',
//   'occupied',
//   'occupied',
//   'available',
//   'available'
// ]


// for (let seat = 1; seat <= 6; seat++) {
//     if (seat <= 2) {
//         console.log(`Seat ${seat} = Reserved`);
//     } else if (seat <= 4) {
//         console.log(`Seat ${seat} = Occupied`);
//     } else {
//         console.log(`Seat ${seat} = Available`);
//     }
// }

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



// students = [
//     { name: 'Karinda', age: 24, marks: 73, grade: 'B' },
//     { name: 'Grolia', age: 17, marks: 60, grade: 'C' },
//     { name: 'Leah', age: 23, marks: 90, grade: 'A' },
//     { name: 'Mpano', age: 20, marks: 40, grade: 'D' }
// ];

// students.forEach((student, index) =>{
//     if (student.marks >= 70) {
//         console.log(`${student.name} ${student.marks}: EXELLENCE`)
//     } else if(student.marks >=50 && student.marks < 70){
//         console.log(`${student.name} ${student.marks}: GOOD`)
//     }else{
//         console.log(`${student.name} ${student.marks}: FAIL`)
//     }
//     })

//     for( let x = 0; x < students.length; x++){
// console.log(`The student name is ${students[x].name}: they have ${students[x].marks} marks.`)

//     }

//     function removingTheExclamation(Word){
//         let newWord = "";
//         for(let i = 0; i < Word.length; i++){
//             if(Word[i] !== "!")
//             newWord += Word[i];
//         }
//         return  newWord;
//     }
//     console.log(removingTheExclamation('Suprise'))

// let attendance = [
//     'Present',
//     'Absent',
//     'Present',
//     'Absent',
//     'Present',
//     'Absent',
//     'Present',
//     'Absent',
//     'Present',
//     'Absent'
// ];
// let totalStudent = 0;
// let PresentStudent = 0;
// let AbsentStudent = 0;

// while (totalStudent < 10) {
//     let status = prompt('please enter present or absent')
//     if (status === 'Present') {
//         PresentStudent++
//         totalStudent++
//     } else if (status === 'Absent') {
//         AbsentStudent++
//         totalStudent++
//     } else {
//         console.log('please enter present or absent')
//     }
// }

// console.log('total students:', totalStudent);
// console.log('Present students:', PresentStudent);
// console.log('Absent students:', AbsentStudent);
