
this.document.getElementById("login").addEventListener("click", login)

async function login(email, password) {
    let Email = document.getElementsByTagName("input")[0].value;
    let Password = document.getElementsByTagName("input")[1].value;

    if (Email == 'admin' && Password == 123) {
        sessionStorage.setItem("admin", JSON.stringify({ "role": "admin" }));
        location.assign("../html/adminDashboardAllEmployees.html ");
    }
    const securityStream = await fetch(`http://localhost:3000/security`, { cache: "no-store" });
    const employeesSteam = await fetch(`http://localhost:3000/employees`, { cache: "no-store" });
    const employeesArray = await employeesSteam.json();
    const securityArray = await securityStream.json();

    let flag = 0;
    employeesArray.forEach(emp => {
        if (emp.mail == Email && emp.password == Password) {
            emp.role = 'employee';
            sessionStorage.setItem("loggedinEmployeeData", JSON.stringify(emp));
            // localStorage.setItem("loggedinEmployeeData", JSON.stringify(emp));
            location.assign("../html/employeeProfile.html");
            flag = 1;
        }
    })

    securityArray.forEach(emp => {
        if (emp.mail == Email && emp.password == Password) {
            emp.role = 'security';
            sessionStorage.setItem("loggedinEmployeeData", JSON.stringify(emp));
            // localStorage.setItem("loggedinEmployeeData", JSON.stringify(emp));
            location.assign("../html/attendance.html");
            flag = 1;
        }
    });
    if (flag == 0) {
        alert(" failed login , check your email and password");
    }
}