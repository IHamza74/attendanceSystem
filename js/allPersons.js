import { fetchAllCurrentEmps, fetchAllPendingEmps, fetchAllSecurity } from "./pendingEmployeesCrud.js"

export async function allPersons() {

    let allCurrentEmps = await fetchAllCurrentEmps();
    let allPendingEmps = await fetchAllPendingEmps();
    let allsecurity = await fetchAllSecurity();
    let allOEmpsObj = allCurrentEmps.concat(allPendingEmps, allsecurity);
    return allOEmpsObj;
}