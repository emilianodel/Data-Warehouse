const usuarios = document.getElementById("users");
const register_form = document.querySelector(".form_wrapper");
const logo = document.querySelector(".logo");

usuarios.addEventListener('click', e => {
    register_form.style.display = 'block'
});

logo.addEventListener('click', e =>{
    window.location.reload();
})
