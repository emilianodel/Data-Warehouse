/*--Usado para todos los js--*/

const token = JSON.parse(localStorage.getItem("token"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

/*----*/


document.getElementById("companias").addEventListener('click', showCompanies);
const companiesList = document.getElementById('companies')


function cargarCompanias() {
  showCompanies()
}



async function showCompanies() {
    companiesList.innerHTML = ''

    document.getElementById('contactos').style.display ='none'
    document.getElementById('companies').style.display ='inherit'
    document.getElementById('users_info').style.display = 'none'
    document.getElementById('boxRegiones').style.display = 'none'
    
    let companies ={
        method: "GET",
        headers: myHeaders
        
    }

    const response = await fetch('http://localhost:3000/companies', companies)
    const data = await response.json()
    console.log(data)
    showingCompanies(data)
}


function showingCompanies (data) {
  console.log(data)
  companiesList.innerHTML = ''
  let divtitle = document.createElement('div')
  companiesList.appendChild(divtitle)

  let title = document.createElement('h2')
  divtitle.appendChild(title)

  let addButton = document.createElement('button')
  divtitle.appendChild(addButton)
  addButton.setAttribute('id', "company")
  addButton.addEventListener('click', newCompany) 

  let companieTable = document.createElement("table");
  companiesList.appendChild(companieTable);

  let tableThead = document.createElement("thead");
  companieTable.appendChild(tableThead);

  let companieTr = document.createElement("tr");
  tableThead.appendChild(companieTr);

  let nameTitle = document.createElement("th");
  let nameAddress = document.createElement("th");
  let nameEmail = document.createElement("th");
  let nameCity = document.createElement("th");
  let nameOptions = document.createElement("th");
  companieTr.appendChild(nameTitle);
  companieTr.appendChild(nameAddress);
  companieTr.appendChild(nameEmail);
  companieTr.appendChild(nameCity);
  companieTr.appendChild(nameOptions);
  nameTitle.innerHTML = "Compañia";
  nameAddress.innerHTML = "Direccion";
  nameEmail.innerHTML = "Email";
  nameCity.innerHTML = "Ciudad";
  nameOptions.innerHTML = "Acciones";
  title.innerHTML = "Compañias"
  addButton.innerHTML ="Agregar"
  
  divtitle.setAttribute('id', 'div_title')

  data.forEach(async info => {

   

    let companieTableInfo = document.createElement("tbody");
    companieTable.appendChild(companieTableInfo);
    let trCompanie = document.createElement("tr");
      let name = document.createElement("th");
      let address = document.createElement("th");
      let email = document.createElement("th");
      let city = document.createElement("th");
      let options = document.createElement("th");
      let edit = document.createElement("h3");
      let deletecompany = document.createElement("img");
      companieTableInfo.appendChild(trCompanie);
      trCompanie.appendChild(name);
      trCompanie.appendChild(address);
      trCompanie.appendChild(email);
      trCompanie.appendChild(city);
      trCompanie.appendChild(options);
      options.appendChild(edit);
      options.appendChild(deletecompany);
      edit.setAttribute("class","edit");
      edit.style.cursor="pointer";
      deletecompany.setAttribute("class","delete");
      deletecompany.style.cursor="pointer";

      let id_company = info.id_company;
      name.innerHTML = info.name;
      address.innerHTML = info.address;
      email.innerHTML = info.email;
      city.innerHTML = info.city_name;

      let company_name = info.name;
      let company_address = info.address;
      let company_email= info.email;
      let company_phone = info.phone
      let city_id = info.id_city;
      

      edit.innerHTML = 'Editar'
      edit.addEventListener('click', function() {
        updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company)
      })
      deletecompany.setAttribute('src', '/images/close.svg')
      deletecompany.addEventListener('click', function () {
          companyDelete(id_company)
          
      })

  })


}

        
function companyDelete(id_company) {
    let requestProject = {
      method: "DELETE",
      headers: myHeaders,
    };
    
    const urlUsuarios = `http://localhost:3000/companies/${id_company}`;
    fetch(urlUsuarios, requestProject)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.message == "Compañia eliminada exitosamente") {
          alert("Compañia eliminada exitosamente");
          cargarCompanias();
        } else alert("Error al eliminar la compañia, la misma esta en uso por otra seccion");
      })
      
      .catch((error) => console.error("Error:", error));
      
  }
  

function CerrarCompany() {
    document.body.removeChild(newDiv);
};

function newCompany() {
  
    newDiv = document.createElement("div");
    newDiv.classList.add("new_div");
    newDiv.innerHTML = ` 
      <div class="bigger_gif">
        <p>Nueva Compañia</p>
      </div>
      <div class="add_company">
        <form class="new_company">
            <div>
                <p>Nombre</p>
                <input type="name" name="name" placeholder="" required/>
            </div>
             <div>
                <p>Direccion</p>
                <input type="name" name="address" placeholder="" required />
            </div>
            <div>
                <p>Email</p>
                <input type="name" name="email" placeholder="" required />
            </div>
            <div>
                <p>Numero de telefono</p>
                <input type="name" name="phone" placeholder="" required />
            </div>
            <div>
            <p>Ciudad</p>
            <input type="name" name="id_city" list="sel" id="city_name" placeholder="" required />
            <datalist id="sel" >
                <option value="" >-- Select --</option>
            </datalist>
            </div>
        </form>
       
      </div>
      <div class="buttons_company">
        <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
        <button class="save" onclick="newCompanies()">Guardar compañia</button>
      </div>
      `;
    document.body.appendChild(newDiv);
  
  async function loadData() {
      let url = "http://localhost:3000/cities"
  
      let requestInfo = {
          method: "GET",
          headers: myHeaders,
        };
  
      const response = await fetch(url, requestInfo)
      const data = await response.json()
      console.log(data[0].city_name)
      citiesList(data)
    
     
     
  }
  
  
function citiesList (data) {
    var ele = document.getElementById('sel');
    console.log(ele)
    for (var i = 0; i < data.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + data[i].id + '">' + data[i].city_name + '</option>';
    }
  
  }
  loadData();
};
  



async function newCompanies() {
  

  let inputCollection = document.querySelectorAll('.new_company input')
  let body = {}
  

  for (let i = 0; i < inputCollection.length; i++) {
      let nombre = inputCollection[i].name 
      let valor = inputCollection[i].value 
      body[nombre] = valor
     
  }
  
  const response  = await fetch('http://localhost:3000/companies', {
  method: 'POST',
  body: JSON.stringify(body), 
  headers: myHeaders

  })
  console.log(body)
  const data = await response.json()

  if (data.message == "Compañia creada exitosamente") {
    alert("Compañia creada exitosamente");
    CerrarCompany();
    cargarCompanias();
  } else {
    alert("Error al crear la compañia, la misma ya existe o faltan campos por completar");
  }
  console.log(data)
}


// Prueba de actualizacion



function updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company) {
  
  newDiv = document.createElement("div");
  newDiv.classList.add("new_div");
  newDiv.innerHTML = ` 
    <div class="bigger_gif">
    </div>
    <div class="add_company">
      <form class="new_company">
          <div>
              <p>Nombre</p>
              <input type="name" name="name" id="c_name" placeholder="" required textContent="Hello"/>
          </div>
           <div>
              <p>Direccion</p>
              <input type="name" name="address" id="c_address" placeholder="" required />
          </div>
          <div>
              <p>Email</p>
              <input type="name" name="email" id="c_email" placeholder="" required />
          </div>
          <div>
              <p>Numero de telefono</p>
              <input type="name" name="phone" id="c_phone" placeholder="" required />
          </div>
          <div>
          <p>Ciudad</p>
          <input type="name" name="id_city" list="sel" id="city_name" placeholder="" required />
          <datalist id="sel" >
              <option value="" >-- Select --</option>
          </datalist>
          </div>
      </form>
     
    </div>
    <div class="buttons_company">
      <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
      <button class="save" onclick="updateCompanies(${id_company})">Actualizar compañia</button>
    </div>
    `;
  document.body.appendChild(newDiv);
  document.getElementById('c_name').value = `${company_name}`
  document.getElementById('c_address').value = `${company_address}`
  document.getElementById('c_email').value = `${company_email}`
  document.getElementById('c_phone').value =`${company_phone}`
  document.getElementById('city_name').value = `${city_id}`
  //console.log(id_company)
  

async function loadData() {
    let url = "http://localhost:3000/cities"

    let requestInfo = {
        method: "GET",
        headers: myHeaders,
      };

    const response = await fetch(url, requestInfo)
    const data = await response.json()
    console.log(data[0].city_name)
    citiesList(data)
   
   
}


function citiesList (data) {
  var ele = document.getElementById('sel');
  console.log(ele)
  for (var i = 0; i < data.length; i++) {
      // POPULATE SELECT ELEMENT WITH JSON.
      ele.innerHTML = ele.innerHTML +
          '<option value="' + data[i].id + '">' + data[i].city_name + '</option>';
      
  }

}
loadData();
};


async function updateCompanies(id_company) {
  

  let inputCollection = document.querySelectorAll('.new_company input')
  let body = {}
  

  for (let i = 0; i < inputCollection.length; i++) {
      let nombre = inputCollection[i].name 
      let valor = inputCollection[i].value 
      body[nombre] = valor
     
  }
  
  const response  = await fetch(`http://localhost:3000/companies/${id_company}`, {
  method: 'PATCH',
  body: JSON.stringify(body), 
  headers: myHeaders

  })
  console.log(body)
  const data = await response.json()

  if (data.message == "Compañia actualizada exitosamente") {
    alert("Compañia actualizada exitosamente");
    CerrarCompany();
    cargarCompanias();
  } else {
    alert("Error al actualizar la compañia, la misma ya existe o faltan campos por completar");
  }
  console.log(data)
}