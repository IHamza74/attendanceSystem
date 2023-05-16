
export async function senEmail(emp) {

    let response = await emailjs.send("service_xpzp00u", "template_gy23w5a", {
        to_name: `${emp.fName} ${emp.lName}`,
        message: `${emp.userName}`,
        message1: `${emp.password}`,
        to_email: `${emp.mail}`,
    });

}

