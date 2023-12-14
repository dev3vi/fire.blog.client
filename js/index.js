import { API_URL } from './config.js';

async function saveLog(latitude, longitude) {
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
            infoDevice: detectBrowser(),
            latLong: latitude + "," + longitude
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
saveLog(0, 0);

var handlerLg= document.getElementById("address");
var nameAddress= document.getElementById("name-address");
handlerLg.addEventListener("click", getPossition, false);

function getPossition() {
    event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            saveLog(position.coords.latitude, position.coords.longitude);
            createMap(position.coords.latitude, position.coords.longitude);
            axios.get("https://whatismyaddress.net/lookup-address/" + position.coords.latitude +
            "," + position.coords.longitude).then(response => {
                nameAddress.innerHTML = response.toString();
            }).catch(error => {
                console.error('Lỗi khi truy vấn địa chỉ IP:', error);
            })
          },
          function(error) {
            console.error('Lỗi không xác định:', error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Trình duyệt của bạn không hỗ trợ geolocation.');
      }
}

var allowGeoRecall = true;
var countLocationAttempts = 0;
function getLocation() {   
    console.log('getLocation was called') 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, 
        positionError);
    } else {
        hideLoadingDiv()
        console.log('Geolocation is not supported by this device')
    }
}

function positionError() {    
    console.log('Geolocation is not enabled. Please enable to use this feature')
        
     if(allowGeoRecall && countLocationAttempts < 5) {
         countLocationAttempts += 1;
         getLocation();
     }
 }

function showPosition(){
    console.log('posititon accepted')
    allowGeoRecall = false;
}

function createMap(latitude, longitude) {
    var mapContainer = document.getElementById('map-container');

    // Tạo động iframe với tọa độ mới
    var iframe = document.createElement('iframe');
    iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    iframe.width = '300';
    iframe.height = '150';
    iframe.allowfullscreen = true;

    // Xóa nội dung cũ và thêm iframe mới
    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
  }

  // Gọi hàm với tọa độ cụ thể (ví dụ: 20.9846272, 105.7980416)
