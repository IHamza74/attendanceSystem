import { allPersons } from "./allPersons.js"

export async function generateRandomUsername(name) {
    let allPersonsReadableStream = await allPersons();
    let allPersonsArray = await allPersonsReadableStream[0];
    // console.log(allPersonsArray);
    let chars = "0123456789!@-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let usernameLength = 4;
    let username = name.substring(0, 4);
    for (let i = 0; i <= usernameLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        username += chars.substring(randomNumber, randomNumber + 1);
    }


    for (let i = 0; i < allPersonsArray.length; i++) {
        if (username == allPersonsArray[i]) {
            return username = generateRandomUsername(name);
        }
    }
    return username;
}


export function generateRandomPassword() {
    let chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@$%-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let passwordLength = 12;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
}