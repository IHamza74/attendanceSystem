export function getTimeAsString() {
    let rowTime = new Date().toLocaleString('en-US', { hour12: false })
    return rowTime.split(",")[1].substring(1, 6);
}

export function calculatingLatencyTime(checkIn) {
    let hours = Number(checkIn.substring(0, 2))
    let minutes = Number(checkIn.substring(3, 5));
    //assuming that late is after 8.30
    let lateHours = hours - 8;
    let lateMinutes = minutes - 30;
    let totalLatencyInMinutes = (lateHours * 60) + (lateMinutes);
    if (totalLatencyInMinutes >= 30) {

        //returning an array of needed data
        //1st element represents late minutes
        //2nd element represents absency
        return [0, true]
    } else {
        //returning an array of needed data
        //1st element represents late minutes
        //2nd element represents absency
        return [totalLatencyInMinutes, false]
    }


}