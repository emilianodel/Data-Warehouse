
const createBtn = document.querySelector('.CrearBtn')

createBtn.addEventListener('click', async ()  => {
    let inputCollection = document.querySelectorAll('.table_users input')
    let body = {}

    for (let i = 0; i < inputCollection.length; i++) {
        let nombre = inputCollection[i].name 
        let valor = inputCollection[i].value 
        body[nombre] = valor
       
    }
    
    if (body.isAdmin == "si") {
      body.isAdmin = 1;
    } else if (body.isAdmin == "SI"){
      body.isAdmin = 1;
    } else if (body.isAdmin == "sI"){
      body.isAdmin = 1;
    } else if (body.isAdmin == "Si"){
      body.isAdmin = 1;
    }else {
      body.isAdmin = 0;
    }
    
    if(body.pass == body.repeatpass){
      fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(body), 
      headers: myHeaders

    }).then ((response) => response.json())
    .then((json) => {
     
      console.log(json);
      if (json.message == "Usuario creado exitosamente") {
        alert("Usuario creado exitosamente");
        showUsers();
        document.getElementById('usuarios').style.display = 'none' ;
      } else {
        alert("Usuario registrado o faltan datos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));


    } else {
      alert("Las contraseñas no coinciden");
    }
    
})




document.getElementById("users").addEventListener('click', showUsers);
const usersList = document.getElementById('users_info')


function cargarUsers() {
  showUsers()
}



async function showUsers() {
  usersList.innerHTML = ''
    document.getElementById('boxRegiones').style.display = 'none';
    document.getElementById('users_info').style.display = 'inherit'
    document.getElementById('companies').style.display = 'none'
    let users ={
        method: "GET",
        headers: myHeaders
        
    }

    const response = await fetch('http://localhost:3000/users', users)
    const data = await response.json()
    console.log(data)
    showingusers(data)
}

function showingusers (data) {
  console.log(data)
  usersList.innerHTML = ''
  let divtitle = document.createElement('div')
  usersList.appendChild(divtitle)

  let title = document.createElement('h2')
  divtitle.appendChild(title)

  let addButton = document.createElement('button')
  divtitle.appendChild(addButton)
  addButton.setAttribute('id', "company")
  addButton.addEventListener('click', newUsers) 

  let usersTable = document.createElement("table");
  usersList.appendChild(usersTable);

  let tableThead = document.createElement("thead");
  usersTable.appendChild(tableThead);

  let usersTr = document.createElement("tr");
  tableThead.appendChild(usersTr);

  let name = document.createElement("th");
  let last_name = document.createElement("th");
  let nameEmail = document.createElement("th");
  let nameOptions = document.createElement("th");
  usersTr.appendChild(name);
  usersTr.appendChild(last_name);
  usersTr.appendChild(nameEmail);
  usersTr.appendChild(nameOptions);

  name.innerHTML = "Nombre";
  last_name.innerHTML = "Apellido";
  nameEmail.innerHTML = "Email";
  nameOptions.innerHTML = "Acciones";
  title.innerHTML = "Usuarios"
  addButton.innerHTML ="Agregar"
  
  divtitle.setAttribute('id', 'div_title')

  let admin = localStorage.getItem("isAdmin");
  if (admin == 0) {
  document.getElementById('company').style.display = 'none';
  
  }


  data.forEach(async info => {

   

    let usersTableInfo = document.createElement("tbody");
    usersTable.appendChild(usersTableInfo);
    let trUsers = document.createElement("tr");
      let name = document.createElement("th");
      let last_name = document.createElement("th");
      let email = document.createElement("th");
      let city = document.createElement("th");
      let options = document.createElement("th");
      let edit = document.createElement("h3");
      let deletecompany = document.createElement("img");
      usersTableInfo.appendChild(trUsers);
      trUsers.appendChild(name);
      trUsers.appendChild(last_name);
      trUsers.appendChild(email);

      trUsers.appendChild(options);
      options.appendChild(edit);
      options.appendChild(deletecompany);
      edit.setAttribute("class","edit");
      edit.style.cursor="pointer";
      deletecompany.setAttribute("class","delete");
      deletecompany.style.cursor="pointer";

      let users_id = info.users_id;
      name.innerHTML = info.first_name;
      last_name.innerHTML = info.last_name;
      email.innerHTML = info.email;
      

      let users_name = info.first_name;
      let users_last_name = info.last_name;
      let users_email= info.email;
      let users_pass = info.pass;
      let users_admin = info.isAdmin
      

      edit.innerHTML = 'Editar'
      edit.addEventListener('click', function() {
        updateUsers(users_id, users_name, users_last_name, users_email, users_pass, users_admin)
      })
      deletecompany.setAttribute('src', '/images/close.svg')
      deletecompany.addEventListener('click', function () {
        usersDelete(users_id)
          
      })

  })


}

        
function usersDelete(users_id) {
    let requestProject = {
      method: "DELETE",
      headers: myHeaders,
    };
    
    const urlUsuarios = `http://localhost:3000/users/${users_id}`;
    fetch(urlUsuarios, requestProject)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.message == "Usuario eliminado exitosamente") {
          alert("Usuario eliminado exitosamente");
          cargarUsers();
        } else alert("Error al eliminar usuario, el mismo esta en uso por otra seccion");
      })
      
      .catch((error) => console.error("Error:", error));
      
  }
  

document.querySelector('.cancel').addEventListener('click', function() {
  document.getElementById('usuarios').style.display = 'none' 
})

function newUsers() {
  document.getElementById('usuarios').style.display = 'inherit'
  document.querySelector('.form_wrapper').style.display = 'inherit'
};


function updateUsers(users_id, users_name, users_last_name, users_email, users_pass,users_admin) {
  
  newDiv = document.createElement("div");
  newDiv.classList.add("new_div");
  newDiv.innerHTML = ` 
    <div class="bigger_gif">
    </div>
    <div class="add_company">
      <form class="new_company">
          <div>
              <p>Nombre</p>
              <input type="name" name="first_name" id="u_name" placeholder="" required textContent="Hello"/>
          </div>
           <div>
              <p>appelido</p>
              <input type="name" name="last_name" id="u_lastname" placeholder="" required />
          </div>
          <div>
              <p>Email</p>
              <input type="name" name="email" id="u_email" placeholder="" required />
          </div>
          <div>
              <p>Contraseña</p>
              <input type="name" name="pass" id="u_pass" placeholder="" required />
          </div>
          <div>
            <p>¿Es Administrador? Por favor responder: Si o No</p>
            <input type="name" name="isAdmin" list="sel" id="u_isadmin" placeholder="" required />
          </div>
      </form>
     
    </div>
    <div class="buttons_company">
      <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
      <button class="save" onclick="updateUser(${users_id})">Actualizar Usuario</button>
    </div>
    `;
  document.body.appendChild(newDiv);
  document.getElementById('u_name').value = `${users_name}`
  document.getElementById('u_lastname').value = `${users_last_name}`
  document.getElementById('u_email').value = `${users_email}`
  document.getElementById('u_pass').value = `${users_pass}`
  //document.getElementById('u_isadmin').value = `${users_admin}`
  
};

async function updateUser(users_id) {
  

  let inputCollection = document.querySelectorAll('.new_company input')
  let body = {}
  

  for (let i = 0; i < inputCollection.length; i++) {
      let nombre = inputCollection[i].name 
      let valor = inputCollection[i].value 
      body[nombre] = valor   
     
  }

    
  if (body.isAdmin == "si") {
    body.isAdmin = 1;
  } else if (body.isAdmin == "SI"){
    body.isAdmin = 1;
  } else if (body.isAdmin == "sI"){
    body.isAdmin = 1;
  } else if (body.isAdmin == "Si"){
    body.isAdmin = 1;
  }else {
    body.isAdmin = 0;
  }
  
  
  const response  = await fetch(`http://localhost:3000/users/${users_id}`, {
  method: 'PATCH',
  body: JSON.stringify(body), 
  headers: myHeaders

  })
  console.log(body)
  const data = await response.json()

  if (data.message == "Usuario actualizado exitosamente") {
    alert("Usuario actualizado exitosamente");
    CerrarCompany();
    cargarUsers();
  } else {
    alert("Error al actualizar el usuario , el mismo ya existe o otra seccion la esta usando");
  }
  console.log(data)
}