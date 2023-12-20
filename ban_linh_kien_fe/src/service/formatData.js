
export const IdByNow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return "" + year + month + day + hour + minute + second;
}
export const getDate = (time) => {
    let day = new Date(time);
    let hour = day.getHours();
    let minute = day.getMinutes();
    let date = day.getDate();
    let month = day.getMonth() + 1;
    let year = day.getFullYear();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return `${hour}:${minute} - ${date}-${month}-${year}`
}