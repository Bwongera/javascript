function registerStudent() {
    let studentName = document.getElementById("studentName").value;
    let age = document.getElementById("age").value;

    document.getElementById("studentInfo").innerHTML = 
    "Student Name:" + studentName + "<br>" +
    "Age:" +  age;

}