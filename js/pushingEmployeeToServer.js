// import { sendMail } from "./sendMail.js";
import { isEmpExisted } from "./isEmpExisted.js";
import { postingEmpToPending } from "./postingEmpToPendingEmps.js";
import { generateRandomUsername, generateRandomPassword } from "./usernamePasswordGenerator.js"


export async function pushingEmployeeToServer(emp) {
    const arrayLength = await isEmpExisted("pendingEmployees", "NationalId", emp.NationalId);
    // const pendingEmpsResponse = await fetch(`http://localhost:3000/${dep}?${prop}=${empProp}`);

    console.log(arrayLength);
    if (arrayLength == 0) {
        emp.userName = await generateRandomUsername(emp.fName);
        emp.password = generateRandomPassword();
        postingEmpToPending(emp);
        // sendMail();
        window.open("http://www.w3schools.com", "_self");
    } else {
        alert("user is already existed ");

    }

}

