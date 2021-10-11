/*const { response } = require("express");
const { Json } = require("sequelize/types/lib/utils");*/

//const { json } = require("body-parser");
const form = document.querySelector(".login-form")
const login_one = document.getElementById("login")
login_one.addEventListener('click', login)

function login() {
  
  
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const login = { email: email, pass: pass };
  const url = "http://localhost:3000/users/login";
  
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
      if (json.message == "Usuario o contrasena incorrecta") {
        alert("Error en login");
      } else {
        
        localStorage.setItem("token", JSON.stringify(json.token));
        window.location.href = 'index.html'
      }
    })
    .catch((error) => console.error("Error:", error));
}


