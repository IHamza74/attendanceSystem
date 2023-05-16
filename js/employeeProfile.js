import { displayingEmployeeDetails, displayTodayAttendanceData, displayAllDaysAttendance, displayCertainDaysAttendance } from "./employeeDisplayingFunctions.js";

let todayDetailsBtn = document.getElementById("todayDetails");
let AllTimeDetailsBtn = document.getElementById("allDetails");
let certainTimeDetailsBtn = document.getElementById("certainDurationDetails");

window.addEventListener("load", displayingEmployeeDetails);


todayDetailsBtn.addEventListener("click", displayTodayAttendanceData);
AllTimeDetailsBtn.addEventListener("click", displayAllDaysAttendance);
certainTimeDetailsBtn.addEventListener("click", displayCertainDaysAttendance);

