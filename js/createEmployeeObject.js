import { employee } from "./employeeClass.js";
export function createEmployeeObject() {

    let userFirstName = document.getElementById("userFirstName").value;
    let userLastName = document.getElementById("userLastName").value;
    let userMail = document.getElementById("userMail").value;
    let userID = document.getElementById("userID").value;
    let userAddress = document.getElementById("userAddress").value;
    let userAge = document.getElementById("userAge").value;

    // let emp = new employee(userFirstName, userLastName, userID, userMail, userAddress, userAge);

    return { id: "", fName: userFirstName, lName: userLastName, mail: userMail, NationalId: userID, address: userAddress, age: userAge, userName: "", password: "", isAdmin: false };
}