import { senEmail } from "./mail.js";

export async function getEmpByID(empID) {
    const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${empID}`, { cache: "no-store" });
    const pendingEmpArray = await pendingEmpResponse.json();
    let empObj = pendingEmpArray[0];
    return empObj;
}

export async function postingEmpTo(department, emp) {
    const response = await fetch(`http://localhost:3000/${department}`, {
        method: "POST",
        body: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
    })
}

export async function deletePendingEmpByID(empID) {
    const response = await fetch(`http://localhost:3000/pendingEmployees/${empID}`, {
        method: "DELETE",
    })
}

export async function fetchAllPendingEmps() {
    const pendingEmpsResponse = await fetch(`http://localhost:3000/pendingEmployees`);
    const pendingEmpsArray = await pendingEmpsResponse.json();
    // console.log(pendingEmpsArray.length);
    return pendingEmpsArray;
}

export async function fetchAllCurrentEmps() {
    const currentmpsResponse = await fetch(`http://localhost:3000/employees`);
    const currentEmpsArray = await currentmpsResponse.json();
    // console.log(pendingEmpsArray.length);
    return currentEmpsArray;
}
export async function fetchAllSecurity() {
    const securityResponse = await fetch(`http://localhost:3000/security`);
    const securitympsArray = await securityResponse.json();
    // console.log(pendingEmpsArray.length);
    return securitympsArray;
}


export async function everyDayDeafultAbsenceObject(_id, path) {
    let empReadableStream = await fetch(`http://localhost:3000/${path}/${_id}`, { cache: "no-store" })
    let emp = await empReadableStream.json();
    if (!emp.attendanceLog) { emp.attendanceLog = {}; }
    let AttendanceLog = emp.attendanceLog;
    let date = new Date().toLocaleString().split(",")[0].replaceAll("/", "-");
    AttendanceLog[date] = {
        "checkIn": null,
        "checkOut": '15:30',
        "late": false,
        "absence": true,
        "excuse": false
    };

    console.log(`attendence log after ${emp.attendanceLog}`)
    updateAttendance(path, _id, AttendanceLog)
}

export async function getAnEmployeeOrSecurity(path, username) {
    const response = await fetch(`http://localhost:3000/${path}?userName=${username}`, { cache: "no-store" });

    return await response.json();

}

export async function updateAttendance(path, _id, AttendanceLog) {
    let respose = await fetch(`http://localhost:3000/${path}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            attendanceLog: AttendanceLog
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function postingEmpToSecurity(empID) {
    let empArray = await getEmpByID(empID);
    let emp = empArray;
    await senEmail(emp);
    await deletePendingEmpByID(empID);
    emp.id = "";
    emp.attendanceLog = {};
    const response = await fetch("http://localhost:3000/security", {
        method: "POST",
        body: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
    })
}

export async function postingEmpToEmployees(empID) {
    let empArray = await getEmpByID(empID);
    let emp = empArray;
    await senEmail(emp);
    // console.log(emp);
    await deletePendingEmpByID(empID);
    emp.id = "";
    emp.attendanceLog = {};
    // console.log(emp);

    const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        body: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
    })
}
