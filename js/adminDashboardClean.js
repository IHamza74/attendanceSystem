// import * as CRUD from "../js/pendingEmployeesCrud.js";
import { senEmail } from "./mail.js";
import { displayDailyReport } from "./adminAllFunctions.js";
import { pendingEmployeesControllers } from "./adminAllFunctions.js";

window.addEventListener("load", pendingEmployeesControllers);

document.getElementById("pendingEmployeesTab").addEventListener("click", pendingEmployeesControllers)


document.getElementById("DailyReportBTN").addEventListener("click", async function () {
    await displayDailyReport("employees");
    await displayDailyReport("security");
});



















export async function getEmpByID(empID) {
    const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${empID}`);
    return await pendingEmpResponse.json();
}

// export async function addToEmployees(id) {
//     const pendingEmpResponse = await fetch(`http://localhost:3000/pendingEmployees?id=${id}`);
//     const pendingEmpArray = await pendingEmpResponse.json();

//     let empObj = pendingEmpArray[0];
// }



// export async function deletePendingEmpByID(empID) {
//     const response = await fetch(`http://localhost:3000/pendingEmployees/${empID}`, {
//         method: "DELETE",
//     })
// }






