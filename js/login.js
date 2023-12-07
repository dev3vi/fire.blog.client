import { API_URL } from './config.js';
const USERNAME = "USERNAME";
var handlerLg= document.getElementById("handlerLogin");
handlerLg.addEventListener("click", handlerLogin, false);
function handlerLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    axios.post(API_URL + "/api/authenticate", {
      username: username,
      password: password
    })
    .then((response) => {
        Cookies.set(USERNAME, response.data.username, { expires: 1 });
        console.log(Cookies.get(USERNAME))
        var isLoginLink = document.getElementById('isLogin');
        isLoginLink.innerText = `${Cookies.get(USERNAME)}`;
    });
  }