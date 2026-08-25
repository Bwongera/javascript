let scanner = null;
let scannerRunning = false;

// Get today's date
function getCurrentDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Display today's date
function displayCurrentDate() {
    document.getElementById("current-date").textContent = getCurrentDate();
}


// Determine attendance status
function getAttendanceStatus() {
    const now = new Date();

    const hour = now.getHours();
    const minute = now.getMinutes();

    // 08:00 - 08:04
    if (hour === 8 && minute <= 4) {
        return "Present";
    }

    // 08:05 - 08:59
    if (hour === 8 && minute >= 5) {
        return "Late";
    }

    // 09:00 and after
    if (hour >= 9) {
        return "Absent";
    }

    // Before 08:00
    return "Not Started";
}


// Get current time
function getCurrentTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}


// Save attendance
function saveAttendance(studentId, status, date, time) {

    const attendance = JSON.parse(
        localStorage.getItem("attendance")
    ) || [];

    attendance.push({
        studentId: studentId,
        date: date,
        time: time,
        status: status
    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );
}


// When QR is successfully scanned
function onScanSuccess(decodedText) {

    if (!scannerRunning) {
        return;
    }

    const studentId = decodedText.trim();

    const date = getCurrentDate();
    const time = getCurrentTime();
    const status = getAttendanceStatus();

    document.getElementById("student-id").textContent = studentId;
    document.getElementById("scan-time").textContent = time;
    document.getElementById("status").textContent = status;
    document.getElementById("attendance-date").textContent = date;

    document.getElementById("result").textContent =
        "QR scanned successfully!";

    // Save attendance
    saveAttendance(
        studentId,
        status,
        date,
        time
    );

    // Stop after successful scan
    stopScanner();
}


// Handle scanner errors
function onScanError(errorMessage) {
    // Ignore normal scanning errors
}


// Start scanner
async function startScanner() {

    if (scannerRunning) {
        return;
    }

    scanner = new Html5Qrcode("reader");

    try {

        await scanner.start(
            {
                facingMode: "environment"
            },
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },
            onScanSuccess,
            onScanError
        );

        scannerRunning = true;

        document.getElementById("result").textContent =
            "Scanner is ready. Scan a QR code.";

    } catch (error) {

        console.error(error);

        document.getElementById("result").textContent =
            "Camera could not start. Allow camera permission.";
    }
}


// Stop scanner
async function stopScanner() {

    if (!scanner || !scannerRunning) {
        return;
    }

    try {

        await scanner.stop();

        scanner.clear();

        scannerRunning = false;

        document.getElementById("result").textContent =
            "Scanner stopped.";

    } catch (error) {

        console.error(error);
    }
}


// Buttons
document.getElementById("start-btn").addEventListener(
    "click",
    startScanner
);

document.getElementById("stop-btn").addEventListener(
    "click",
    stopScanner
);


// Start page
displayCurrentDate();