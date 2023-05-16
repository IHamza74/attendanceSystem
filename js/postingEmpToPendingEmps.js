export async function postingEmpToPending(emp) {
    const response = await fetch("http://localhost:3000/pendingEmployees", {
        method: "POST",
        body: JSON.stringify(emp),
        headers: { "Content-Type": "application/json" },
    })
}

