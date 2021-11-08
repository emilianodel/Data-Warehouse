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
    
    companiesList.innerHTML = ''
    let divtitle = document.createElement('div')
    companiesList.appendChild(divtitle)

    let title = document.createElement('h2')
    divtitle.appendChild(title)

    let addButton = document.createElement('button')
    divtitle.appendChild(addButton)

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
        let editar = document.createElement("h3");
        let eliminar = document.createElement("h3");
        companieTableInfo.appendChild(trCompanie);
        trCompanie.appendChild(name);
        trCompanie.appendChild(address);
        trCompanie.appendChild(email);
        trCompanie.appendChild(city);
        trCompanie.appendChild(options);
        options.appendChild(editar);
        options.appendChild(eliminar);
        editar.setAttribute("class","editar");
        editar.style.cursor="pointer";
        eliminar.setAttribute("class","eliminar");
        eliminar.style.cursor="pointer";

        name.innerHTML = info.name;
        address.innerHTML = info.address;
        email.innerHTML = info.email;
        city.innerHTML = info.city_name;

    })

  
}
        
