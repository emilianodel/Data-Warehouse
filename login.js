
document.getElementById("login").addEventListener("click", login);
function login() {
  const email = document.getElementById("email");
  const pass = document.getElementById("password");
  const login = { email: email, pass: pass };
  const url = `http://localhost:3000/users/login`;

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
      if (json.msj == "Error") {
        alert("Error en login");
      } else {
        console.log(json);
        localStorage.setItem("token", JSON.stringify(json.token));
        localStorage.setItem("admin", JSON.stringify(json.admin));

      }
    })
    .catch((error) => console.error("Error:", error));
}
