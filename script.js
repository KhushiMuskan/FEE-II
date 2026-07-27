function calculateGrade() {
    let marks = document.getElementById("marks").value;
    let result = document.getElementById("result");

    if (marks === "") {
        result.innerHTML = "❗ Please enter your marks.";
        result.style.color = "red";
    }
    else if (marks < 0 || marks > 100) {
        result.innerHTML = "❗ Marks should be between 0 and 100.";
        result.style.color = "red";
    }
    else if (marks >= 90) {
        result.innerHTML = "Grade: A+ 🎉";
        result.style.color = "green";
    }
    else if (marks >= 80) {
        result.innerHTML = "Grade: A";
        result.style.color = "green";
    }
    else if (marks >= 70) {
        result.innerHTML = "Grade: B";
        result.style.color = "blue";
    }
    else if (marks >= 60) {
        result.innerHTML = "Grade: C";
        result.style.color = "orange";
    }
    else if (marks >= 40) {
        result.innerHTML = "Grade: D";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "Fail ❌";
        result.style.color = "red";
    }
}
