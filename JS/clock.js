function updateClock() {

    const now = new Date();

    const options = {
        timeZone: "Africa/Kigali",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const time = new Intl.DateTimeFormat("en-GB", options).format(now);

    document.getElementById("clock").textContent = time;

    document.getElementById("date").textContent =
        new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Kigali",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(now);
}

updateClock();

setInterval(updateClock, 1000);




