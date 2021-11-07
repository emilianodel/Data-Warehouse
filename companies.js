/*--Aplicable para todos los js--*/

const token = JSON.parse(localStorage.getItem("token"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

/*--Aplicable para todos los js FIN --*/


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
    companiesList.innerHTML = ''
    let tablaCompanias = document.createElement("table");
    companiesList.appendChild(tablaCompanias);
    let headTablaCom = document.createElement("thead");
    tablaCompanias.appendChild(headTablaCom);
    let trCompaniaHead = document.createElement("tr");
    headTablaCom.appendChild(trCompaniaHead);
    let tituloNombre = document.createElement("th");
    let tituloDireccion = document.createElement("th");
    let tituloEmail = document.createElement("th");
    let tituloCiudad = document.createElement("th");
    let tituloAccion = document.createElement("th");
    trCompaniaHead.appendChild(tituloNombre);
    trCompaniaHead.appendChild(tituloDireccion);
    trCompaniaHead.appendChild(tituloEmail);
    trCompaniaHead.appendChild(tituloCiudad);
    trCompaniaHead.appendChild(tituloAccion);
    tituloNombre.innerHTML = "Compañia";
    tituloDireccion.innerHTML = "Direccion";
    tituloEmail.innerHTML = "Email";
    tituloCiudad.innerHTML = "Ciudad";
    tituloAccion.innerHTML = "Acciones";
    data.forEach(async info => {
      /*const id = info.id_company
      const name = info.name

      id_company = document.createElement('p')
      id_company.textContent = `${id}`
      name_company = document.createElement('p')
      name_company.textContent = `${name}`

      companiesList.appendChild(id_company)
      companiesList.appendChild(name_company)*/

     

      let tablaCompaniasDatos = document.createElement("tbody");
      tablaCompanias.appendChild(tablaCompaniasDatos);
      let trCompaniaDetalle = document.createElement("tr");
        let nombre = document.createElement("th");
        let direccion = document.createElement("th");
        let email = document.createElement("th");
        let ciudad = document.createElement("th");
        let accion = document.createElement("th");
        let editar = document.createElement("h3");
        let eliminar = document.createElement("h3");
        tablaCompaniasDatos.appendChild(trCompaniaDetalle);
        trCompaniaDetalle.appendChild(nombre);
        trCompaniaDetalle.appendChild(direccion);
        trCompaniaDetalle.appendChild(email);
        trCompaniaDetalle.appendChild(ciudad);
        trCompaniaDetalle.appendChild(accion);
        accion.appendChild(editar);
        accion.appendChild(eliminar);
        editar.setAttribute("class","editar");
        editar.style.cursor="pointer";
        eliminar.setAttribute("class","eliminar");
        eliminar.style.cursor="pointer";
        nombre.innerHTML = info.name;
        direccion.innerHTML = info.address;
        email.innerHTML = info.email;
        ciudad.innerHTML = info.city_name;

    })

  
}
        
