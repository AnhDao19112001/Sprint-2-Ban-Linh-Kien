export const formatNumberOverNine = (i) => {
    if (i <= 9){
        return i;
    } else {
        return "9+";
    }
}
export const reduceLengthName = (str, maxLength) => {
    if (maxLength >= str.length){
        return str;
    } else {
        return str.substring(0, maxLength) + "...";
    }
}
export const sameDate = (d1, d2) => {
    if (d1 == null || d2 == null){
        return false;
    } else {
        return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    }
}
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
export const getHourMinute = (time) => {
    let day = new Date(time)
    let hour = day.getHours();
    let minute = day.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return hour + ":" + minute;
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
export const getOnlyDayMonth = (time) => {
    let day = new Date(time);
    let date = day.getDate();
    let month = day.getMonth() + 1;
    let year = day.getFullYear();
    if (date < 10) {
        date = "0" + date;
    }
    if (month < 10) {
        month = "0" + month;
    }
    return `${date}-${month}-${year}`
}
export const getFullDate = (time) => {
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
    return `${hour}:${minute} - Ngày ${date} tháng ${month} năm ${year}`
}