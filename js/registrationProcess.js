import { createEmployeeObject } from "./createEmployeeObject.js"
import { pushingEmployeeToServer } from "./pushingEmployeeToServer.js";
import { sendMail } from "./sendMail.js"

document.getElementById("submit").addEventListener("click", register);


async function register() {
    let newemployee = createEmployeeObject();
    await pushingEmployeeToServer(newemployee);
}

