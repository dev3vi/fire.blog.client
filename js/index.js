import { API_URL } from './config.js';
async function saveLog() {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    let ip = await getIP();
    axios.post(API_URL + "/api/log-info", {
        time: datetime,
        ip: ip,
        infoDevice: detectBrowser()
    }).then(() => {});
}

async function getIP() {
    let res = ''
    await axios.get("https://api.ipify.org?format=json").then(response => {
        res = response.data.ip;
    }).catch(error => {
        console.error('Lỗi khi truy vấn địa chỉ IP:', error);
    })
    return res;
}

function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { // IF IE > 10
        return 'IE';
    } else {
        return 'unknown';
    }
}
saveLog();