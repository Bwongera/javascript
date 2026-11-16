

const onButton = document.getElementById("on-button");

const offButton = document.getElementById("off-button");

const onImage = document.getElementById("on-image");

const offImage = document.getElementById("off-image");

const status = document.getElementById("status");



onButton.addEventListener("click", function () {


    onImage.hidden = false;


    offImage.hidden = true;

    status.textContent = "Light is ON 💡";

    status.style.color = "green";

});



offButton.addEventListener("click", function () {


    offImage.hidden = false;

    onImage.hidden = true;


    status.textContent = "Light is OFF";

    status.style.color = "red";

});
