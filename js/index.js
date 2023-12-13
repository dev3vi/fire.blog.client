import { API_URL } from './config.js';

async function saveLog() {
    var currentTimeMillis = Date.now();
    var currentDate = new Date(currentTimeMillis);
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var hours = String(currentDate.getHours()).padStart(2, '0');
    var minutes = String(currentDate.getMinutes()).padStart(2, '0');
    var seconds = String(currentDate.getSeconds()).padStart(2, '0');
    var formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    
    let ip = await getIP();
    setTimeout(function() {
        axios.post(API_URL + "/api/log-info", {
            time: formattedTime,
            ip: ip,
            infoDevice: detectBrowser()
        }).then(() => {});
      }, 2000);
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