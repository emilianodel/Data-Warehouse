const createBtn = document.querySelector('.CrearBtn')

createBtn.addEventListener('click', async ()  => {
    let inputCollection = document.querySelectorAll('.table_users input')
    let body = {}

    for (let i = 0; i < inputCollection.length; i++) {
        let nombre = inputCollection[i].name 
        let valor = inputCollection[i].value 
        body[nombre] = valor
       
    }

     
    if ( body.isAdmin == "si") {
      body.isAdmin = 1;
    } else {
      body.isAdmin = 0;
    }

    console.log(body)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(body), 
      headers: myHeaders
      
    }).then ((response) => response.json())
    .then((json) => {
     
      console.log(json);
      if (json.message == "Usuario creado exitosamente") {
       
      } else {
        alert("Usuario registrado o faltan datos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
})
   