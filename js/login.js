import { API_URL } from './config.js';
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
      console.log(response);
    });
  }