import { getTimeAsString } from "./dateAndTimeManipulation.js";
import { everyDayDeafultAbsenceObject, fetchAllCurrentEmps, fetchAllSecurity, getAnEmployeeOrSecurity, updateAttendance } from "./pendingEmployeesCrud.js";
import { calculatingLatencyTime } from "./dateAndTimeManipulation.js";

window.addEventListener('load', checkAuthorization);

document.getElementsByTagName("form")[0].addEventListener("submit", async function (e) {
    e.preventDefault();
    await attendance("message");
})

document.getElementById("defaults").addEventListener("click", await newDayAbsence)
document.getElementById("signout").addEventListener("click", function () {
    sessionStorage.removeItem("loggedinEmployeeData");
    location.assign("http://127.0.0.1:5500/html/login.html");

})

function checkAuthorization() {
    if (JSON.parse(sessionStorage.getItem("loggedinEmployeeData"))) {
        let token = JSON.parse(sessionStorage.getItem("loggedinEmployeeData"));
        if (token.role != 'security') {
            alert("only security are authorized to access this page");
            location.assign("../html/login.html");
        }
    } else {
        alert("only security are authorized to access this page");
        location.assign("../html/login.html");
    }
}

async function newDayAbsence() {
    let allEmployees = await fetchAllCurrentEmps();
    let allsecurity = await fetchAllSecurity();

    async function editEmps() {
        for (const employee of allEmployees) { await everyDayDeafultAbsenceObject(employee.id, "employees") }
    }
    await editEmps();

    async function editSecurity() {
        for (const security of allsecurity) { await everyDayDeafultAbsenceObject(security.id, "security") }
    }
    await editSecurity();

}


async function attendance(message) {
    let inputUsername = document.getElementsByTagName("input")[0].value;
    let path = document.getElementsByTagName("select")[0].value;

    let date = new Date().toLocaleString().split(",")[0].replaceAll("/", "-");
    let emp = await getAnEmployeeOrSecurity(path, inputUsername);
    if (emp.length == 0) {
        alert("wrong username or sector")
    } else {
        console.log(emp)
        let AllAttendanceLogs = emp[0].attendanceLog;
        let attendanceinfo = AllAttendanceLogs[date];
        let time = getTimeAsString();
        if (attendanceinfo.checkIn == null) {
            attendanceinfo.checkIn = time;
            let latencyArray = calculatingLatencyTime(time);
            attendanceinfo.late = latencyArray[0];
            attendanceinfo.absence = latencyArray[1];
            AllAttendanceLogs[date] = attendanceinfo;


            updateAttendance(path, emp[0].id, AllAttendanceLogs)
            console.log(attendanceinfo);
        } else if (attendanceinfo.checkIn != null && attendanceinfo.checkOut == null) {
            attendanceinfo.checkOut = time;
            AllAttendanceLogs[date] = attendanceinfo;
            updateAttendance(path, emp[0].id, AllAttendanceLogs)
        } else {
            alert("you have already checked in and checked out");
        }
    }

}
