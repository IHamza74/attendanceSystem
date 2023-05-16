export async function displayingEmployeeDetails() {

    if (sessionStorage.getItem("loggedinEmployeeData") === null) {
        alert("you must log in first");
        location.assign("../html/login.html");
    }

    let DateBtn = document.getElementById("DateBtn");
    DateBtn.style.display = "none"
    let startDateInput = document.getElementById("startDate");
    startDateInput.style.display = "none"
    let endDateInput = document.getElementById("endDate");
    endDateInput.style.display = "none"


    let table = document.getElementById("employeeDetailsTable")
    let tableTbody = document.getElementById("employeeDetailsTbody");

    tableTbody.innerHTML = "";

    if ($.fn.dataTable.isDataTable('#employeeDetailsTable')) {
        $('#employeeDetailsTable').DataTable().clear().destroy();
    }

    let empData = sessionStorage.getItem("loggedinEmployeeData")
    let emp = JSON.parse(empData);
    document.getElementById("EMPDATA").innerText = `${emp.fName} ${emp.lName} `


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
    // table.appendChild(tableTbody);

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
    // table.append(tableTbody)

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

export async function displayTodayAttendanceData() {

    let DateBtn = document.getElementById("DateBtn");
    DateBtn.style.display = "none"
    let startDateInput = document.getElementById("startDate");
    startDateInput.style.display = "none"
    let endDateInput = document.getElementById("endDate");
    endDateInput.style.display = "none"



    let today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-")
    // document.getElementById("DataContent").innerText = today;

    let tableTbody = document.getElementById("todayAttendanceTbody");
    tableTbody.innerHTML = "";

    if ($.fn.dataTable.isDataTable('#todayAttendanceDetails')) {
        $('#todayAttendanceDetails').DataTable().clear().destroy();
        // alert("ssssss")
    }


    let empData = sessionStorage.getItem("loggedinEmployeeData")
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


    let dataTr = document.createElement("tr");

    let DayTD = document.createElement("td");
    let checkinTD = document.createElement("td");
    let checkoutTD = document.createElement("td");
    let lateTD = document.createElement("td");
    let absenceTD = document.createElement("td");
    let excuseTD = document.createElement("td");

    console.log(`today is${today}`)
    console.log(`emp.attendanceLog ${emp.attendanceLog}`)

    // console.log(`today is${today}`)
    // console.log(emp.attendanceLog)
    let todayAttendance = emp.attendanceLog[today];
    // DayTD.innerText = today;
    console.log(emp.todayAttendance);
    checkinTD.innerText = todayAttendance.checkIn;
    checkoutTD.innerText = todayAttendance.checkOut;
    lateTD.innerText = todayAttendance.late;
    absenceTD.innerText = todayAttendance.absence;
    excuseTD.innerText = todayAttendance.excuse;

    dataTr.append(DayTD, checkinTD, checkoutTD, lateTD, absenceTD, excuseTD);
    tableTbody.append(dataTr);

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

export async function displayAllDaysAttendance() {

    let DateBtn = document.getElementById("DateBtn");
    DateBtn.style.display = "none"
    let startDateInput = document.getElementById("startDate");
    startDateInput.style.display = "none"
    let endDateInput = document.getElementById("endDate");
    endDateInput.style.display = "none"


    let today = new Date().toLocaleString().split(",")[0].replaceAll("/", "-")
    // document.getElementById("DataContent").innerText = today;

    let tableTbody = document.getElementById("todayAttendanceTbody");
    tableTbody.innerHTML = "";

    if ($.fn.dataTable.isDataTable('#todayAttendanceDetails')) {
        $('#todayAttendanceDetails').DataTable().clear().destroy();
    }


    let empData = sessionStorage.getItem("loggedinEmployeeData")
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


    let allAttendanceDays = emp.attendanceLog;

    let attendanceDaysDates = Object.keys(allAttendanceDays);
    let attendanceDaysDetails = Object.values(allAttendanceDays);

    for (let i = 0; i < attendanceDaysDates.length; i++) {

        let dataTr = document.createElement("tr");

        let DayTD = document.createElement("td");
        let checkinTD = document.createElement("td");
        let checkoutTD = document.createElement("td");
        let lateTD = document.createElement("td");
        let absenceTD = document.createElement("td");
        let excuseTD = document.createElement("td");


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

export async function displayCertainDaysAttendance() {

    if ($.fn.dataTable.isDataTable('#todayAttendanceDetails')) {
        $('#todayAttendanceDetails').DataTable().clear().destroy();
    }
    let DateBtn = document.getElementById("DateBtn");
    DateBtn.style.display = "inline-block"
    let startDateInput = document.getElementById("startDate");
    startDateInput.style.display = "inline-block"
    let endDateInput = document.getElementById("endDate");
    endDateInput.style.display = "inline-block"

    DateBtn = document.getElementById("DateBtn");
    DateBtn.addEventListener("click", async function () {
        let startDateInput = document.getElementById("startDate");
        let endDateInput = document.getElementById("endDate");
        let startDate = new Date(startDateInput.value).toLocaleString()
            .split(",")[0].replaceAll("/", "-")
        let endDate = new Date(endDateInput.value).toLocaleString().split(",")[0].replaceAll("/", "-");

        if (startDate > endDate) {
            alert("start date can not be before end date");
        }
        else {

            if (startDate == "Invalid Date" || endDate == "Invalid Date") {
                alert("wrong date")
            } else {

                let tableTbody = document.getElementById("todayAttendanceTbody");
                tableTbody.innerHTML = "";


                let empData = sessionStorage.getItem("loggedinEmployeeData")
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
    })
}