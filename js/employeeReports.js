// import * as CRUD from "../js/pendingEmployeesCrud.js";

let authentication = JSON.parse(sessionStorage.getItem("employee"));
if (authentication == null) {
    // location.assign(`http://127.0.0.1:5500/home.html`)
}



$("#pendingEmps").DataTable({
    ajax: {
        url: "http://localhost:3000/pendingEmployees",
        dataSrc: "",
    },
    columns: [
        { data: "id" },
        { data: "fName" },
        { data: "lName" },
        { data: "mail" },
        { data: "NationalId" },
        { data: "address" },
        { data: "age" },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button onClick="postingEmpToEmployees(${row.id})"><img width="20px" height="20px" src="../imgs/approve.png"></button>`;
            },
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button onClick="postingEmpToSecurity(${row.id})"><img width="20px" height="20px" src="../imgs/delete.jpg"></button>`;

            },
        },
        {
            data: null,
            render: function (data, type, row, meta) {
                return `<button onClick="deletePendingEmpByID(${row.id})"><img width="20px" height="20px" src="../imgs/delete.jpg"></button>`;

            },
        },

    ],
});

// import { postingEmpTo } from "../js/pendingEmployeesCrud.js"

async function addToEmployees(id) {
    const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${id}`);
    const pendingEmpArray = await pendingEmpResponse.json();
    let empObj = pendingEmpArray[0];
}

async function postingEmpToEmployees(empID) {
    let empArray = await getEmpByID(empID);
    let emp = empArray[0];
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
async function postingEmpToSecurity(empID) {
    let empArray = await getEmpByID(empID);
    let emp = empArray[0];
    await deletePendingEmpByID(empID);
    emp.id = "";
    emp.attendanceLog = {};
    // console.log(emp);
    const response = await fetch("http://localhost:3000/security", {
        method: "POST",
        body: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
    })
}
async function getEmpByID(empID) {
    const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${empID}`);
    return await pendingEmpResponse.json();
}

async function deletePendingEmpByID(empID) {
    const response = await fetch(`http://localhost:3000/pendingEmployees/${empID}`, {
        method: "DELETE",
    })
}
