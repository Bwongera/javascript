/* =========================================
   STUDENT ATTENDANCE SYSTEM
   QR SCANNER / CAMERA REMOVED
========================================= */


/* =========================================
   LOCAL STORAGE
========================================= */

const ATTENDANCE_KEY = "attendanceRecords";
const STUDENTS_KEY = "registeredStudents";


let attendanceRecords =
  JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || [];

let students =
  JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];


/* =========================================
   DOM ELEMENTS
========================================= */

const navLinks =
  document.querySelectorAll(".nav-link");

const pageSections =
  document.querySelectorAll(".page-section");


const totalStudents =
  document.getElementById("totalStudents");

const presentToday =
  document.getElementById("presentToday");

const lateToday =
  document.getElementById("lateToday");

const absentToday =
  document.getElementById("absentToday");


const summaryPresent =
  document.getElementById("summaryPresent");

const summaryLate =
  document.getElementById("summaryLate");

const summaryAbsent =
  document.getElementById("summaryAbsent");


const recentTableBody =
  document.getElementById("recentTableBody");

const recordsTableBody =
  document.getElementById("recordsTableBody");

const studentsTableBody =
  document.getElementById("studentsTableBody");


const recentEmpty =
  document.getElementById("recentEmpty");

const recordsEmpty =
  document.getElementById("recordsEmpty");

const studentsEmpty =
  document.getElementById("studentsEmpty");


const toast =
  document.getElementById("toast");

const toastMessage =
  document.getElementById("toastMessage");

const toastIcon =
  document.getElementById("toastIcon");


/* =========================================
   DATE & TIME
========================================= */

function getToday() {

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatDate(dateString) {

  if (!dateString) {
    return "";
  }

  const date =
    new Date(dateString + "T00:00:00");

  return date.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );
}


function updateDateTime() {

  const now = new Date();

  const date =
    now.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

  const time =
    now.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );

  const headerDate =
    document.getElementById("headerDate");

  const headerTime =
    document.getElementById("headerTime");

  const summaryDate =
    document.getElementById("summaryDate");

  if (headerDate) {
    headerDate.textContent = date;
  }

  if (headerTime) {
    headerTime.textContent = time;
  }

  if (summaryDate) {
    summaryDate.textContent = date;
  }
}


updateDateTime();

setInterval(updateDateTime, 1000);


/* =========================================
   SAVE DATA
========================================= */

function saveAttendance() {

  localStorage.setItem(
    ATTENDANCE_KEY,
    JSON.stringify(attendanceRecords)
  );
}


function saveStudents() {

  localStorage.setItem(
    STUDENTS_KEY,
    JSON.stringify(students)
  );
}


/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

  pageSections.forEach(section => {

    section.classList.remove(
      "active-section"
    );

  });


  const target =
    document.getElementById(sectionId);

  if (target) {

    target.classList.add(
      "active-section"
    );

  }


  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.dataset.section === sectionId
    ) {

      link.classList.add("active");

    }

  });

}


navLinks.forEach(link => {

  link.addEventListener(
    "click",
    function(event) {

      event.preventDefault();

      const section =
        this.dataset.section;

      showSection(section);

      history.replaceState(
        null,
        "",
        `#${section}`
      );

    }
  );

});


function loadInitialSection() {

  const hash =
    window.location.hash.replace("#", "");

  if (
    hash &&
    document.getElementById(hash)
  ) {

    showSection(hash);

  } else {

    showSection("dashboard");

  }

}


loadInitialSection();


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(
  message,
  type = "success"
) {

  toastMessage.textContent =
    message;


  if (type === "error") {

    toastIcon.textContent = "×";
    toastIcon.style.background =
      "#dc2626";

  } else {

    toastIcon.textContent = "✓";
    toastIcon.style.background =
      "#16a34a";

  }


  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 3000);

}


/* =========================================
   GET TODAY RECORDS
========================================= */

function getTodayRecords() {

  const today =
    getToday();

  return attendanceRecords.filter(
    record => record.date === today
  );

}


/* =========================================
   DASHBOARD STATISTICS
========================================= */

function updateStatistics() {

  const todayRecords =
    getTodayRecords();


  totalStudents.textContent =
    students.length;


  const present =
    todayRecords.filter(
      record =>
        record.status === "Present"
    ).length;


  const late =
    todayRecords.filter(
      record =>
        record.status === "Late"
    ).length;


  const absent =
    todayRecords.filter(
      record =>
        record.status === "Absent"
    ).length;


  presentToday.textContent =
    present;

  lateToday.textContent =
    late;

  absentToday.textContent =
    absent;


  summaryPresent.textContent =
    present;

  summaryLate.textContent =
    late;

  summaryAbsent.textContent =
    absent;

}


/* =========================================
   STATUS HTML
========================================= */

function getStatusHTML(status) {

  let className =
    "status-present";


  if (status === "Late") {

    className =
      "status-late";

  }


  if (status === "Absent") {

    className =
      "status-absent";

  }


  return `
    <span class="status ${className}">
      ${escapeHTML(status)}
    </span>
  `;

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;

}


/* =========================================
   RENDER RECENT RECORDS
========================================= */

function renderRecentRecords() {

  const recent =
    [...attendanceRecords]
      .sort(
        (a, b) =>
          b.createdAt - a.createdAt
      )
      .slice(0, 7);


  recentTableBody.innerHTML = "";


  if (recent.length === 0) {

    recentEmpty.style.display =
      "block";

    return;

  }


  recentEmpty.style.display =
    "none";


  recent.forEach(record => {

    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>
        <strong>
          ${escapeHTML(record.studentId)}
        </strong>
      </td>

      <td>
        ${escapeHTML(record.studentName)}
      </td>

      <td>
        ${formatDate(record.date)}
      </td>

      <td>
        ${escapeHTML(record.time)}
      </td>

      <td>
        ${getStatusHTML(record.status)}
      </td>
    `;


    recentTableBody.appendChild(row);

  });

}


/* =========================================
   RENDER ALL RECORDS
========================================= */

function renderRecords() {

  const searchInput =
    document.getElementById("searchInput");

  const statusFilter =
    document.getElementById("statusFilter");


  const search =
    searchInput.value
      .trim()
      .toLowerCase();


  const filterStatus =
    statusFilter.value;


  const filtered =
    [...attendanceRecords]
      .sort(
        (a, b) =>
          b.createdAt - a.createdAt
      )
      .filter(record => {

        const matchesSearch =
          record.studentId
            .toLowerCase()
            .includes(search) ||

          record.studentName
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          filterStatus === "All" ||
          record.status === filterStatus;


        return (
          matchesSearch &&
          matchesStatus
        );

      });


  recordsTableBody.innerHTML = "";


  if (filtered.length === 0) {

    recordsEmpty.style.display =
      "block";

    return;

  }


  recordsEmpty.style.display =
    "none";


  filtered.forEach(record => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <strong>
          ${escapeHTML(record.studentId)}
        </strong>
      </td>

      <td>
        ${escapeHTML(record.studentName)}
      </td>

      <td>
        ${formatDate(record.date)}
      </td>

      <td>
        ${escapeHTML(record.time)}
      </td>

      <td>
        ${getStatusHTML(record.status)}
      </td>

      <td>

        <button
          class="delete-btn"
          onclick="deleteAttendance('${record.id}')"
        >
          Delete
        </button>

      </td>

    `;


    recordsTableBody.appendChild(row);

  });

}


/* =========================================
   RENDER STUDENTS
========================================= */

function renderStudents() {

  studentsTableBody.innerHTML = "";


  if (students.length === 0) {

    studentsEmpty.style.display =
      "block";

    return;

  }


  studentsEmpty.style.display =
    "none";


  const sortedStudents =
    [...students].sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );


  sortedStudents.forEach(student => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <strong>
          ${escapeHTML(student.id)}
        </strong>
      </td>

      <td>
        ${escapeHTML(student.name)}
      </td>

      <td>
        ${escapeHTML(student.className)}
      </td>

      <td>
        ${formatDate(student.registered)}
      </td>

      <td>

        <button
          class="delete-btn"
          onclick="deleteStudent('${student.id}')"
        >
          Delete
        </button>

      </td>

    `;


    studentsTableBody.appendChild(row);

  });

}


/* =========================================
   ATTENDANCE FORM
========================================= */

const attendanceForm =
  document.getElementById(
    "attendanceForm"
  );


const attendanceDate =
  document.getElementById(
    "attendanceDate"
  );


attendanceDate.value =
  getToday();


attendanceForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const studentId =
      document
        .getElementById("studentId")
        .value
        .trim();


    const studentName =
      document
        .getElementById("studentName")
        .value
        .trim();


    const date =
      attendanceDate.value;


    const status =
      document
        .getElementById(
          "attendanceStatus"
        )
        .value;


    if (
      !studentId ||
      !studentName ||
      !date
    ) {

      showToast(
        "Please complete all fields.",
        "error"
      );

      return;

    }


    addAttendance(
      studentId,
      studentName,
      date,
      status
    );


    attendanceForm.reset();

    attendanceDate.value =
      getToday();

  }
);


/* =========================================
   ADD ATTENDANCE
========================================= */

function addAttendance(
  studentId,
  studentName,
  date,
  status
) {

  const now =
    new Date();


  const time =
    now.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );


  const record = {

    id:
      Date.now().toString(),

    studentId,

    studentName,

    date,

    time,

    status,

    createdAt:
      Date.now()

  };


  attendanceRecords.push(record);


  saveAttendance();

  updateStatistics();

  renderRecentRecords();

  renderRecords();


  showToast(
    "Attendance saved successfully."
  );

}


/* =========================================
   QUICK ATTENDANCE
========================================= */

const quickAttendanceForm =
  document.getElementById(
    "quickAttendanceForm"
  );


quickAttendanceForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const studentId =
      document
        .getElementById(
          "quickStudentId"
        )
        .value
        .trim();


    const studentName =
      document
        .getElementById(
          "quickStudentName"
        )
        .value
        .trim();


    const status =
      document
        .getElementById(
          "quickStatus"
        )
        .value;


    addAttendance(
      studentId,
      studentName,
      getToday(),
      status
    );


    quickAttendanceForm.reset();

  }
);


/* =========================================
   REGISTER STUDENT
========================================= */

const studentForm =
  document.getElementById(
    "studentForm"
  );


studentForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const id =
      document
        .getElementById(
          "registerStudentId"
        )
        .value
        .trim();


    const name =
      document
        .getElementById(
          "registerStudentName"
        )
        .value
        .trim();


    const className =
      document
        .getElementById(
          "registerClass"
        )
        .value
        .trim();


    if (!id || !name || !className) {

      showToast(
        "Please complete all student fields.",
        "error"
      );

      return;

    }


    const exists =
      students.some(
        student =>
          student.id.toLowerCase() ===
          id.toLowerCase()
      );


    if (exists) {

      showToast(
        "This Student ID already exists.",
        "error"
      );

      return;

    }


    students.push({

      id,

      name,

      className,

      registered:
        getToday()

    });


    saveStudents();

    renderStudents();

    updateStatistics();


    studentForm.reset();


    showToast(
      "Student registered successfully."
    );

  }
);


/* =========================================
   DELETE STUDENT
========================================= */

function deleteStudent(studentId) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this student?"
    );


  if (!confirmed) {
    return;
  }


  students =
    students.filter(
      student =>
        student.id !== studentId
    );


  saveStudents();

  renderStudents();

  updateStatistics();


  showToast(
    "Student deleted successfully."
  );

}


/* =========================================
   DELETE ATTENDANCE
========================================= */

function deleteAttendance(recordId) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this attendance record?"
    );


  if (!confirmed) {
    return;
  }


  attendanceRecords =
    attendanceRecords.filter(
      record =>
        record.id !== recordId
    );


  saveAttendance();

  updateStatistics();

  renderRecentRecords();

  renderRecords();


  showToast(
    "Attendance record deleted."
  );

}


/* =========================================
   CLEAR ALL RECORDS
========================================= */

const clearAllBtn =
  document.getElementById(
    "clearAllBtn"
  );


clearAllBtn.addEventListener(
  "click",
  function() {

    if (
      attendanceRecords.length === 0
    ) {

      showToast(
        "There are no records to clear.",
        "error"
      );

      return;

    }


    const confirmed =
      confirm(
        "WARNING: This will delete ALL attendance records. Continue?"
      );


    if (!confirmed) {
      return;
    }


    attendanceRecords = [];


    saveAttendance();

    updateStatistics();

    renderRecentRecords();

    renderRecords();


    showToast(
      "All attendance records have been cleared."
    );

  }
);


/* =========================================
   SEARCH
========================================= */

const searchInput =
  document.getElementById(
    "searchInput"
  );


const statusFilter =
  document.getElementById(
    "statusFilter"
  );


searchInput.addEventListener(
  "input",
  renderRecords
);


statusFilter.addEventListener(
  "change",
  renderRecords
);


/* =========================================
   DASHBOARD BUTTON
========================================= */

const goAttendanceBtn =
  document.getElementById(
    "goAttendanceBtn"
  );


goAttendanceBtn.addEventListener(
  "click",
  function() {

    showSection("attendance");

    history.replaceState(
      null,
      "",
      "#attendance"
    );

  }
);


/* =========================================
   VIEW ALL
========================================= */

const viewAllBtn =
  document.getElementById(
    "viewAllBtn"
  );


viewAllBtn.addEventListener(
  "click",
  function() {

    showSection("records");

    history.replaceState(
      null,
      "",
      "#records"
    );

  }
);


/* =========================================
   INITIAL RENDER
========================================= */

function initializeSystem() {

  updateStatistics();

  renderRecentRecords();

  renderRecords();

  renderStudents();

}


initializeSystem();