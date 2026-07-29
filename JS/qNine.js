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