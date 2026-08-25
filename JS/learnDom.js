// let hello = document.querySelector('h1')

// let title = document.getElementsByClassName('title')
// let subtitle = document.getElementById('sub-title')
// let description = document.getElementsByTagName('p')


let Title = document.querySelector('.title');
Title.innerHTML = 'Sport News';
Title.style.color = 'red'

let subTitle = document.querySelector("#sub-title");
subTitle.innerHTML = "Cecafa Kagame Cup";

let paragraph = document.querySelector('p');
paragraph.innerHTML = 'The CECAFA Kagame Cup is an annual regional club football tournament organized by the Council for East and Central Africa Football Association (CECAFA). It features top club sides from East and Central Africa and has been sponsored by Rwandan President Paul Kagame since 2002,Tournament OverviewWhat it is: A regional championship for club football teams from member nations like Rwanda, Uganda, Tanzania, Kenya, and Sudan.History: Founded earlier as the CECAFA Club Cup, it was renamed the Kagame Interclub Cup in 2002 when President Paul Kagame started financial sponsorship.Current Event: The 2026 CECAFA Kagame Cup is currently taking place in Kigali, Rwanda, running from July 24 to August 7, 2026, with matches hosted at venues like the Amahoro Stadium.Key FactsParticipants: Features 12 top club teams divided into group stages, including local sides like Rayon Sports and APR FC, alongside regional heavyweights.Prizes: The tournament offers cash prizes supported by the Rwandan presidency, with the champion traditionally receiving $30,000.';

let button = document.querySelector('button')
let result = document.querySelector('span')
button.addEventListener('click', function () {
    result.innerHTML = "We don't have other more description"
}
)

let on = document.querySelector("#on-image")
on.style.display = "none"
let off = document.querySelector("#off-image")

let onbutton = document.querySelector(".on")
let offbutton = document.querySelector(".off")

onbutton.addEventListener("click", function () {
    on.style.display = "block"
    off.style.display = "none"
})

offbutton.addEventListener("click", function () {
    on.style.display = "none"
    off.style.display = "block"
})


let form = document.querySelector("#Enter-mark-form");
let inputValue = document.querySelector("#marks");
let answer = document.querySelector(".form-span")

form.addEventListener("submit", function (e){
    e.preventDefault()
    
    const mark = inputValue.value
    if (mark === ""){
        answer.innerHTML = "Please enter your marks";
        answer.style.color = "red"
    }else if (mark >= 80){
        answer.innerHTML = "Excellent";
        answer.style.color = "green"

    }else if (mark <=79 && mark >= 50) {
        answer.innerHTML = "Good";
        answer.style.color = "orange"
    }else if (mark <50) {
        answer.innerHTML = "Fail";
        answer.style.color = "red"
    }
})