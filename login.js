
document.getElementById("login").addEventListener("click", login);
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const login = { email: email, pass: pass };
  const url = "http://localhost:3000/users/login";
  console.log(email);
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
