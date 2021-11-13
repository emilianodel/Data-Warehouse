/*--Usado para todos los js--*/

const token = JSON.parse(localStorage.getItem("token"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

/*----*/


document.getElementById("companias").addEventListener('click', showCompanies);
const companiesList = document.getElementById('companies')




async function showCompanies() {
    companiesList.innerHTML = ''

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
        edit.innerHTML = 'Editar'
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
        if (json.message == "Compañia eliminado exitosamente") {
          alert("Compañia eliminada exitosamente");
          
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
        <form>
            <div>
                <p>Nombre</p>
                <input type="name" name="name" placeholder="" required />
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
                <p>Numero detelefono</p>
                <input type="name" name="phone" placeholder="" required />
            </div>
            <div>
                <p>Ciudad</p>
                <input type="name" name="id_city" placeholder="" required />
            </div>
        </form>
      </div>
      <div class="buttons_company">
        <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
        <button class="save">Guardar compañia</button>
      </div>
      `;
    document.body.appendChild(newDiv);
};
  
var cities = [];


function loadData() {
    let url = "http://localhost:3000/cities"

    let requestInfo = {
        method: "GET",
        headers: myHeaders,
      };


    fetch(url, requestInfo).then((res) => {
    return res.json()
    }).then((data) => {
    //onLoadCallback(data)
    loadCities(data)
    console.log(data)
    });
}


function loadCities() {
    loadCities(data, storeCitiesLocally)
}
function storeCitiesLocally(data) {
    cities = data.cities
    dropCities(cities)
}

function dropCities(cities) {
    let select = document.getElementById("citiesDropDown");
    cities.forEach(cities => {
    let option = document.createElement("option");
    option.label = cities.name;
    option.value = cities.name;
    
    select.appendChild(option);
    });
    
    //we select the first record
    select.selectedIndex = 0; 
    
    //we show the band
    showSelectedBand();
   }


loadData();
loadCities()