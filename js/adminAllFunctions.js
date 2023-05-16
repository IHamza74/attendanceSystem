import { senEmail } from "./mail.js";
import { fetchAllSecurity, fetchAllCurrentEmps, getAnEmployeeOrSecurity } from "./pendingEmployeesCrud.js";
import { postingEmpToEmployees, postingEmpToSecurity, deletePendingEmpByID } from "./pendingEmployeesCrud.js";




export async function displayDailyReport(path) {

    let tableTBody = document.getElementById("dailyReportTbody");
    let tableThead = document.getElementById("dailyReportThead");

    tableTBody.innerHTML = ""
    //checking existance of table and inside data
    if ($.fn.dataTable.isDataTable('#dailyReport')) {
        $('#dailyReport').DataTable().clear().destroy();
    }

    //displaying today date
    let today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-")
    document.getElementById("DataContent").innerText = today;

    //fetching data from JSON server
    let employeesReadableStream = await fetch(`http://localhost:3000/${path}`);
    let employees = await employeesReadableStream.json();


    if ($.fn.dataTable.isDataTable('#dailyReport')) {
        $('#dailyReport').DataTable().destroy();
    }
    employees.forEach(employee => {

        // console.log(path);
        let empAttendanceLog = employee.attendanceLog[today]
        let tr = document.createElement("tr");
        let idTD = document.createElement("td");
        let nameTD = document.createElement("td");
        let checkinTD = document.createElement("td");
        let checkoutTD = document.createElement("td");
        let lateTD = document.createElement("td");
        let absenceTD = document.createElement("td");
        let excuseTD = document.createElement("td");

        idTD.innerText = employee.id;
        // console.log(employee)
        nameTD.innerText = `${employee.fName} ${employee.lName}`;
        checkinTD.innerText = empAttendanceLog["checkIn"]
        checkoutTD.innerText = empAttendanceLog["checkOut"];
        lateTD.innerText = empAttendanceLog["late"];
        absenceTD.innerText = empAttendanceLog["absence"];
        excuseTD.innerText = empAttendanceLog["excuse"];

        tr.append(idTD, nameTD, checkinTD, checkoutTD, lateTD, absenceTD, excuseTD);
        tableTBody.appendChild(tr);

    });

    $('#dailyReport').DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
    })

}


export async function displayCertainEmployeeData(username) {

    let displayBtn = document.getElementById("displayBtn");
    displayBtn.addEventListener("click", async function () {

        //fetching username to search
        let username = document.getElementById("usernameInput").value;


        let empArray = await getAnEmployeeOrSecurity("employees", username);
        if (empArray.length != 0) {
            let emp = empArray[0]
            emp.sector = "employee"
            sessionStorage.setItem("selectedEmp", JSON.stringify(emp));
            // console.log("saved from employees", emp);
        } else {
            let securityArray = await getAnEmployeeOrSecurity("security", username);
            if (securityArray.length != 0) {
                let emp = empArray[0];
                emp.sector = "security"
                sessionStorage.setItem("selectedEmp", JSON.stringify(emp));
                // console.log("saved from security", emp);
            } else {
                alert("this user is not registered or not admitted yet")
            }
        }
        let empData = sessionStorage.getItem("selectedEmp")
        let selectedEmp = JSON.parse(empData);
        //selecting table to display data
        await displayingEmployeeDetails();
        let empBreif = employeeDataExtracting(selectedEmp);

        //selecting Table
        let table = document.getElementById("employeeDataTable");
        let tHead = document.getElementById("employeeDataThead");
        let tBody = document.getElementById("employeeDataTbody");

        let tr = document.createElement("tr");
        let totWorkDaysTD = document.createElement("td");
        let firstDayTD = document.createElement("td");
        let PresenceDaysTD = document.createElement("td");
        let absenceTD = document.createElement("td");
        let lateTD = document.createElement("td");
        let ExcusedTD = document.createElement("td");
        let sectorTD = document.createElement("td");

        totWorkDaysTD.innerText = empBreif[0];
        firstDayTD.innerText = empBreif[1];
        PresenceDaysTD.innerText = empBreif[2];
        absenceTD.innerText = empBreif[3];
        lateTD.innerText = empBreif[4];
        ExcusedTD.innerText = empBreif[5];
        sectorTD.innerText = selectedEmp.sector;

        tr.append(totWorkDaysTD, firstDayTD, PresenceDaysTD, absenceTD, lateTD, ExcusedTD, sectorTD);
        tBody.appendChild(tr);

    })

}
export async function displayingEmployeeDetails() {

    let table = document.getElementById("employeeDetailsTable")
    let tableTbody = document.getElementById("employeeDetailsTbody");

    tableTbody.innerHTML = "";

    if ($.fn.dataTable.isDataTable('#pendingEmployees')) {
        $('#pendingEmployees').DataTable().clear().destroy();
    }

    let empData = sessionStorage.getItem("selectedEmp")
    let emp = JSON.parse(empData);

    //creating tHead
    let thead = document.createElement("thead");

    let tr = document.createElement("tr");

    let id = document.createElement("th");
    let name = document.createElement("th");
    let NationalId = document.createElement("th");
    let email = document.createElement("th");
    let address = document.createElement("th");
    let age = document.createElement("th");

    id.innerText = "ID"
    name.innerText = "Name"
    NationalId.innerText = "National ID"
    email.innerText = "Email"
    address.innerText = `"Address"`
    age.innerText = "Age"

    tr.append(id, name, NationalId, email, address, age);
    thead.appendChild(tr)
    table.appendChild(thead);
    table.appendChild(tableTbody);

    let DetailsTr = document.createElement("tr");

    let idTD = document.createElement("td");
    let nameTD = document.createElement("td");
    let NationalIdTD = document.createElement("td");
    let emailTD = document.createElement("td");
    let addressTD = document.createElement("td");
    let ageTD = document.createElement("td");

    idTD.innerText = `${emp.id}`
    nameTD.innerText = `${emp.fName} ${emp.lName}`
    NationalIdTD.innerText = `${emp.NationalId}`
    emailTD.innerText = `${emp.mail}`
    addressTD.innerText = `${emp.address}`
    ageTD.innerText = `${emp.age}`

    DetailsTr.append(idTD, nameTD, NationalIdTD, emailTD, addressTD, ageTD);
    tableTbody.append(DetailsTr);
    table.append(tableTbody)

    $('#employeeDetailsTable').DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
    })


}

export async function pendingEmployeesControllers() {
    let result = await fetch("http://localhost:3000/pendingEmployees");
    let employees = await result.json();

    if ($.fn.dataTable.isDataTable('#pendingEmployees')) {
        $('#pendingEmployees').DataTable().clear().destroy();
    }

    // console.log(employees);
    for (let emp of employees) {
        let tr = document.createElement("tr");

        let tds =
            `<td>${emp.id}</d>
        <td>${emp.fName}</d>
        <td>${emp.lName}</d>
        <td>${emp.mail}</d>
        <td>${emp.NationalId}</d>
        <td>${emp.address}</d>
        <td>${emp.age}</d>`
        tr.innerHTML = tds;

        let toEmpsTD = document.createElement("td");
        toEmpsTD.style.textAlign = "center"
        toEmpsTD.addEventListener("click", function () {
            postingEmpToEmployees(emp.id);
        })
        let toEmpsIMG = document.createElement("img");
        toEmpsIMG.src = "../imgs/employee.png"
        toEmpsIMG.style.width = "20px";
        toEmpsTD.appendChild(toEmpsIMG);

        let toSecurityTD = document.createElement("td");
        toSecurityTD.style.textAlign = "center"
        toSecurityTD.addEventListener("click", function () {
            postingEmpToSecurity(emp.id);
        })
        let toSecurityIMG = document.createElement("img");
        toSecurityIMG.src = "../imgs/security.png"
        toSecurityIMG.style.width = "20px";
        toSecurityTD.appendChild(toSecurityIMG);

        let deleteRequestTD = document.createElement("td");
        deleteRequestTD.style.textAlign = "center"
        deleteRequestTD.addEventListener("click", function () {
            deletePendingEmpByID(emp.id)
        })
        let deleteIMG = document.createElement("img");
        deleteIMG.src = "../imgs/delete.png"
        deleteIMG.style.width = "20px";
        deleteRequestTD.appendChild(deleteIMG);
        tr.appendChild(toEmpsTD);
        tr.appendChild(toSecurityTD);
        tr.appendChild(deleteRequestTD);
        tbody.appendChild(tr);

    }

    $("#pendingEmployees").DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
    });


}


export function employeeDataExtracting(emp) {
    let attendanceLog = emp.attendanceLog;
    let Days = Object.keys(attendanceLog);
    let DaysDetails = Object.values(attendanceLog);
    let firstDayOfWork = Days[0];
    let workTotalDays = Days.length;


    let presenceDays = 0;
    let absentDays = 0;
    let lateDays = 0;
    let excusedDays = 0;

    DaysDetails.forEach(day => {
        if (day.absence == true) {
            absentDays++;
        }
        if (day.late == true) {
            lateDays++;
        }
        if (day.excuse == true) {
            excusedDays++;
        }

    })
    presenceDays = workTotalDays - absentDays;

    return [workTotalDays, firstDayOfWork, presenceDays, absentDays, lateDays, excusedDays]
}

export async function displayAllSector(path) {
    let token = JSON.parse(sessionStorage.getItem("admin"))
    if (!token.role) {
        alert("only admin are authorized to access this page");
        location.assign("../html/login.html");
    }
    let result = await fetch(`http://localhost:3000/${path}`);
    let employees = await result.json();

    if ($.fn.dataTable.isDataTable('#pendingEmployees')) {
        $('#pendingEmployees').DataTable().clear().destroy();
    }

    // console.log(employees);
    for (let emp of employees) {
        let tr = document.createElement("tr");

        let tds =
            `<td>${emp.id}</d>
        <td>${emp.fName} ${emp.lName}</d>
        <td>${emp.mail}</d>
        <td>${emp.NationalId}</d>
        <td>${emp.address}</d>
        <td>${emp.age}</d>
        <td>${path}</d>`
        tr.innerHTML = tds;
        tbody.appendChild(tr);

    }

    $("#pendingEmployees").DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
    });


}

export async function displayCertainDaysAttendance() {
    if ($.fn.dataTable.isDataTable('#todayAttendanceDetails')) {
        $('#todayAttendanceDetails').DataTable().clear().destroy();
    }
    let DateBtn = document.getElementById("DateBtn");
    DateBtn.style.display = "inline-block"

    let startDateInput = document.getElementById("startDate");
    let endDateInput = document.getElementById("endDate");
    let startDate = new Date(startDateInput.value).toLocaleString()
        .split(",")[0].replaceAll("/", "-")
    let endDate = new Date(endDateInput.value).toLocaleString().split(",")[0].replaceAll("/", "-");
    startDateInput.style.display = "inline-block"
    endDateInput.style.display = "inline-block"

    if (startDate > endDate) {
        alert("start date can not be before end date");
    }
    else {

        if (startDate == "Invalid Date" || endDate == "Invalid Date") {
            alert("wrong date")
        } else {

            let tableTbody = document.getElementById("todayAttendanceTbody");
            tableTbody.innerHTML = "";

            let flag = 0;

            let username = document.getElementById("usernameInput").value;
            let empArray = await getAnEmployeeOrSecurity("employees", username);
            if (empArray.length != 0) {
                let emp = empArray[0]
                emp.sector = "employee"
                sessionStorage.setItem("selectedEmp", JSON.stringify(emp));
                flag = 1;
                console.log("saved from employees", emp);
            } else {
                let securityArray = await getAnEmployeeOrSecurity("security", username);
                if (securityArray.length != 0) {
                    let emp = empArray[0];
                    emp.sector = "security"
                    sessionStorage.setItem("selectedEmp", JSON.stringify(emp));
                    flag = 1;
                    console.log("saved from security", emp);
                } else {
                    alert("this user is not registered or not admitted yet")
                }
            }

            if (flag == 1) {

                let empData = sessionStorage.getItem("selectedEmp")
                let emp = JSON.parse(empData);

                let thead = document.createElement("thead");

                let tr = document.createElement("tr");
                let Day = document.createElement("th")
                let checkin = document.createElement("th")
                let checkout = document.createElement("th")
                let late = document.createElement("th")
                let absence = document.createElement("th")
                let excuse = document.createElement("th")

                Day.innerText = "Day"
                checkin.innerText = "checkin"
                checkout.innerText = "Checkout"
                late.innerText = "Late"
                absence.innerText = "Absence"
                excuse.innerText = "Excuse"

                tr.append(Day, checkin, checkout, late, absence, excuse);
                thead.appendChild(tr)
                tableTbody.append(thead);

                //destructing attendance Log Object
                let allAttendanceDays = emp.attendanceLog;
                let attendanceDaysDates = Object.keys(allAttendanceDays);
                let attendanceDaysDetails = Object.values(allAttendanceDays);


                let startIndex = attendanceDaysDates.indexOf(startDate.toString());
                let endIndex = attendanceDaysDates.indexOf(endDate.toString())

                //checking if user choose a valid date
                if (startIndex == -1) {
                    alert("start Date is not existed in database");
                }
                else {
                    if (endIndex == -1) { endIndex = attendanceDaysDates.length - 1 }
                    for (let i = startIndex; i <= endIndex; i++) {
                        let dataTr = document.createElement("tr");
                        let DayTD = document.createElement("td");
                        let checkinTD = document.createElement("td");
                        let checkoutTD = document.createElement("td");
                        let lateTD = document.createElement("td");
                        let absenceTD = document.createElement("td");
                        let excuseTD = document.createElement("td");

                        console.log(attendanceDaysDetails[i])
                        DayTD.innerText = attendanceDaysDates[i];
                        checkinTD.innerText = attendanceDaysDetails[i].checkIn;
                        checkoutTD.innerText = attendanceDaysDetails[i].checkOut;
                        lateTD.innerText = attendanceDaysDetails[i].late;
                        absenceTD.innerText = attendanceDaysDetails[i].absence;
                        excuseTD.innerText = attendanceDaysDetails[i].excuse;

                        if (absenceTD.innerText == true) { tr.style.backgroundColor == red }

                        dataTr.append(DayTD, checkinTD, checkoutTD, lateTD, absenceTD, excuseTD);
                        tableTbody.append(dataTr);
                    }
                }
                //table styling
                $('#todayAttendanceDetails').DataTable({
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    info: true,
                    autoWidth: false,
                    responsive: true,
                })

            }
        }
    }

}

export async function getEmpByID(empID) {
    const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${empID}`);
    const pendingEmpArray = await pendingEmpResponse.json();
    let empObj = pendingEmpArray[0];
    return empObj;
}
