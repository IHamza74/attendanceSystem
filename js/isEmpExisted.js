export async function isEmpExisted(dep, prop, empProp) {
    //NationalId
    //mail
    // const pendingEmpsResponse = await fetch(`http://localhost:3000/pendingEmployees?NationalId=${emp.NationalId}`);
    const pendingEmpsResponse = await fetch(`http://localhost:3000/${dep}?${prop}=${empProp}`);
    const pendingEmpsArray = await pendingEmpsResponse.json();
    // console.log(pendingEmpsArray.length);
    return pendingEmpsArray.length;
}
