
  /*traer las regiones*/
  
  let boxRegiones = document.getElementById("boxRegiones")
  let boxRegions = document.getElementById("regions")

boxRegions.addEventListener('click', showRegions)

function showRegions() {
      boxRegiones.style.display ='inherit'
      document.getElementById('companies').style.display = 'none'
      document.getElementById('contactos').style.display = 'none'
      document.getElementById('users_info').style.display = 'none'
      
}

async function getRegiones() {

    let regions ={
        method: "GET",
        headers: myHeaders
        
    }

    const response = await fetch('http://localhost:3000/regions', regions)
    const data = await response.json()
    console.log(data)
    return data
} 
/*getRegiones = async () => {
      const response = await fetch(`http://localhost:3000/regions`,{method: "GET", headers: myHeaders,})
      const json = await response.json()
    
      return json
}*/


  
async function showRegiones(regiones) {
      for (let i = 0; i < regiones.length; i++){
          const region = regiones[i]
          console.log(region) 
          let divRegion = document.createElement("div")
          let nombreRegion =  document.createElement("p")
          let boxRegion = document.createElement("div")
          let editarRegion = document.createElement("p")
          let eliminarRegion = document.createElement("p")
          let agregarPais = document.createElement("p")
          editarRegion.textContent = "Editar"
          eliminarRegion.textContent = "X"
          agregarPais.textContent = "Agregar país"
          editarRegion.setAttribute("class","editarRegion")
          eliminarRegion.setAttribute("class","eliminarRegion")
          agregarPais.setAttribute("class","agregarPais")
          boxRegion.appendChild(nombreRegion)
          boxRegion.appendChild(editarRegion)
          boxRegion.appendChild(eliminarRegion)
          boxRegion.appendChild(agregarPais)
          boxRegion.setAttribute("class","boxRegion")
          nombreRegion.textContent = region.name_region
          nombreRegion.setAttribute("class","nombreRegion")
          boxRegiones.appendChild(divRegion)
          divRegion.setAttribute("class","divRegion")
          divRegion.appendChild(boxRegion)
          let idRegion = region.id
          console.log(idRegion)
          const pais = await getPaises(idRegion)
          let nombreRegions = region.name_region
          //console.log(pais)
  
          /*eliminar una region*/
  
          eliminarRegion.addEventListener("click", ()=>{
            fetch (`http://localhost:3000/regions/${idRegion}`,
                                {
                                  method: "DELETE",
                                  headers: myHeaders,
                                }
                      ).then((res)=>res.json()).then((json)=>{
                        if(json.message=="Región eliminada"){
                          alert("Región eliminada")
                          CerrarCompany();
                          location.reload();
                        }else
                          alert("Error al eliminar la región, puede que este asociada a un país existente")
                        
                      })
           
          })
  
          /*editar una región*/
  
          editarRegion.addEventListener('click', function() {
            updateRegion(nombreRegions)
          })
          function updateRegion(nombreRegions) {
                newDiv = document.createElement("div");
                newDiv.classList.add("new_div");
                newDiv.innerHTML = ` 
                  <div class="bigger_gif">
                    <p>Editar región</p>
                  </div>
                  <div class="add_company">
                    <form class="formularioRegionesEditar">
                        <div>
                            <p>Nombre Región</p>
                            <input type="name" name="name_region" id="name_regionsss" placeholder="" required />
                        </div>
                    </form>
                  </div>
                  <div class="buttons_company">
                    <button onclick="CerrarCompany()" class="cancel_region">Cancelar</button>
                    <button id="btnEditarRegion" class="changes">Editar region</button>
                  </div>
                  `;
                document.body.appendChild(newDiv);
                const btnEditar = document.getElementById("btnEditarRegion")
                document.getElementById('name_regionsss').value = `${nombreRegions}`
                console.log(nombreRegions)
  
                btnEditar.addEventListener("click", async () =>{
                  let inputCollection = document.querySelectorAll(".formularioRegionesEditar input");
                  let body = {};
                  console.log(inputCollection[0].name)
                  for (let i = 0; i < inputCollection.length; i++){
                      let nombre = inputCollection[i].name
                      let valor = inputCollection[i].value
                      console.log(nombre,valor)
                      body[nombre] = valor
                  }
                  console.log(body)
                  editarRegiones(idRegion,body)
                })
          }
  
          /*agregar un país*/
  
          agregarPais.addEventListener("click", ()=>{
                newDiv = document.createElement("div");
                newDiv.classList.add("new_div");
                newDiv.innerHTML = ` 
                  <div class="bigger_gif">
                    <p>Nuevo País</p>
                  </div>
                  <div class="add_company">
                    <form class="formularioPaises">
                        <div>
                            <p>Nombre Pais</p>
                            <input type="name" name="name_countries" placeholder="" required />
                        </div>
                    </form>
                  </div>
                  <div class="buttons_company">
                    <button onclick="CerrarCompany()" class="cancel_region" >Cancelar</button>
                    <button id="btnCrearPais" class="changes">Agregar País</button>
                  </div>
                  `;
                document.body.appendChild(newDiv);
                const btnCrear = document.getElementById("btnCrearPais")
  
                btnCrear.addEventListener("click", async () =>{
                  let inputCollection = document.querySelectorAll(".formularioPaises input");
                  let body = {"region_id":idRegion};
                  console.log(inputCollection[0].name)
                  for (let i = 0; i < inputCollection.length; i++){
                      let nombre = inputCollection[i].name
                      let valor = inputCollection[i].value
                      console.log(nombre,valor)
                      body[nombre] = valor
                  }
                  console.log(body)
                  fetch ("http://localhost:3000/countries",{
                      method: "POST",
                      body: JSON.stringify(body),
                      headers: myHeaders,
                  }).then((res)=>res.json()).then((json)=>{
                    if(json.status=="País creado exitosamente"){
                      alert("País creado exitosamente")
                      CerrarCompany();
                      location.reload();
                    }else
                      alert("Error al crear país, puede que ya exista")
                    
                  })
                  
                })
          })
  
          for (let i = 0; i < pais.length; i++){
              const p = pais[i]
              let divPais = document.createElement("div")
              let boxPais = document.createElement("div")
              let nombrePais =  document.createElement("p")
              let editarPais= document.createElement("p")
              let eliminarPais = document.createElement("p")
              let agregarCiudad = document.createElement("p")
              agregarCiudad.textContent="Agregar ciudad"
              eliminarPais.textContent="X"
              editarPais.textContent = "Editar"
              nombrePais.textContent = p.name_countries
              boxPais.appendChild(nombrePais)
              boxPais.appendChild(editarPais)
              boxPais.appendChild(eliminarPais)
              boxPais.appendChild(agregarCiudad)
              divPais.appendChild(boxPais)
              divRegion.appendChild(divPais)
              divPais.setAttribute("class","boxPais")
              boxPais.setAttribute("class","containerPais")
              editarPais.setAttribute("class","editarPais")
              eliminarPais.setAttribute("class","eliminarPais")
              agregarCiudad.setAttribute("class","agregarCiudad")
              nombrePais.setAttribute("class","nombrePais")
              let idPais = p.id
              let name_country =  p.name_countries;
              const ciudad = await getCiudades(idPais)
              console.log(ciudad)
              console.log(idPais)
  
              /*eliminar un país*/

              eliminarPais.addEventListener("click", ()=>{
                fetch (`http://localhost:3000/countries/${idPais}`,
                                    {
                                      method: "DELETE",
                                      headers: myHeaders,
                                    }
                          ).then((res)=>res.json()).then((json)=>{
                            if(json.message=="Pais eliminado"){
                              alert("País eliminado")
                              CerrarCompany();
                              location.reload();
                            }else
                              alert("Error al eliminar país, puede que esta asociado a alguna ciudad existente")
                            
                          })
              })
  
              /*editar un país*/
            editarPais.addEventListener('click', function() {
                updateCountry(idRegion, name_country)
            })

            console.log(name_country)
            function updateCountry(idRegion,name_country) {
                newDiv = document.createElement("div");
                newDiv.classList.add("new_div");
                newDiv.innerHTML = ` 
                  <div class="bigger_gif">
                    <p>Editar país</p>
                  </div>
                  <div class="add_company">
                    <form class="formularioPaisEditar">
                        <div>
                            <p>Nombre País</p>
                            <input type="name" name="name_countries" id="country" placeholder="" required />
                            <p>ID asociado a región</p>
                            <input type="name" name="region_id" list="sel_region" id="id_region" placeholder="" required />
                            <datalist id="sel_region" >
                                <option value="" >-- Select --</option>
                            </datalist>
                        </div>
                    </form>
                  </div>
                  <div class="buttons_company">
                    <button onclick="CerrarCompany()"class="cancel_region" >Cancelar</button>
                    <button id="btnEditarPais" class="changes">Editar país</button>
                  </div>
                  `;
                document.body.appendChild(newDiv);
                document.getElementById('country').value = `${name_country}`;
                document.getElementById("id_region").value = `${idRegion}`;
                const btnEditar = document.getElementById("btnEditarPais")

                async function loadRegions() {
                    let url = "http://localhost:3000/regions"
                
                    let requestInfo = {
                        method: "GET",
                        headers: myHeaders,
                      };
                
                    const response = await fetch(url, requestInfo)
                    const data = await response.json()
                   
                    regionList(data)
                   
                   
                }
                
                
                function regionList (data) {
                  var ele = document.getElementById('sel_region');
                  console.log(ele)
                  for (var i = 0; i < data.length; i++) {
                      // POPULATE SELECT ELEMENT WITH JSON.
                      ele.innerHTML = ele.innerHTML +
                          '<option value="' + data[i].id + '">' + data[i].name_region + '</option>';
                      
                  }
                
                }
  
                btnEditar.addEventListener("click", async () =>{
                  let inputCollection = document.querySelectorAll(".formularioPaisEditar input");
                  let body = {};
                  console.log(inputCollection[0].name)
                  for (let i = 0; i < inputCollection.length; i++){
                      let nombre = inputCollection[i].name
                      let valor = inputCollection[i].value
                      console.log(nombre,valor)
                      body[nombre] = valor
                  }
                  console.log(body)
                  fetch (`http://localhost:3000/countries/${idPais}`,
                                  {
                                    method: "PUT",
                                    body: JSON.stringify(body),
                                    headers: myHeaders,
                                  }
                        ).then((res)=>res.json()).then((json)=>{
                          if(json.message=="País actualizado"){
                            alert("País actualizado")
                            CerrarCompany();
                            location.reload();
                          }else
                            alert("Error al actualizar país")
                          
                        })
                    
                    
                })
                loadRegions();
            }
  
              
              
              /*agregar una ciudad*/
  
              agregarCiudad.addEventListener("click", () => {
                newDiv = document.createElement("div");
                newDiv.classList.add("new_div");
                newDiv.innerHTML = ` 
                  <div class="bigger_gif">
                    <p>Nueva Ciudad</p>
                  </div>
                  <div class="add_company">
                    <form class="formularioCiudades">
                        <div>
                            <p>Nombre Ciudad</p>
                            <input type="name" name="city_name" placeholder="" required />
                        </div>
                    </form>
                  </div>
                  <div class="buttons_company">
                    <button onclick="CerrarCompany()" class="cancel_region">Cancelar</button>
                    <button id="btnCrearCiudad" class="changes">Agregar Ciudad</button>
                  </div>
                  `;
                document.body.appendChild(newDiv);
                const btnCrear = document.getElementById("btnCrearCiudad")
  
                btnCrear.addEventListener("click", async () =>{
                  let inputCollection = document.querySelectorAll(".formularioCiudades input");
                  let body = {"country_id":idPais};
                  console.log(inputCollection[0].name)
                  for (let i = 0; i < inputCollection.length; i++){
                      let nombre = inputCollection[i].name
                      let valor = inputCollection[i].value
                      console.log(nombre,valor)
                      body[nombre] = valor
                  }
                  console.log(body)
                  fetch ("http://localhost:3000/cities",{
                      method: "POST",
                      body: JSON.stringify(body),
                      headers: myHeaders,
                  }).then((res)=>res.json()).then((json)=>{
                    if(json.status=="Ciudad creada exitosamente"){
                      alert("Ciudad creada exitosamente")
                      CerrarCompany();
                      location.reload();
                    }else
                      alert("Error al crear la ciudad, puede que ya exista")
                    
                  })
                  CerrarCompany()
                  //location.reload()
                })
              })
  
              for (let i = 0; i < ciudad.length; i++){
                  const city = ciudad[i]
                  let divCiudades = document.createElement("div")
                  let nombreCiudad =  document.createElement("p")
                  let editarCiudad= document.createElement("p")
                  let eliminarCiudad = document.createElement("p")
                  let idCiudad = city.id
                  let id_country = city.country_id
                  let cityName = city.city_name
                  nombreCiudad.textContent = city.city_name
                  editarCiudad.textContent="Editar"
                  eliminarCiudad.textContent="X"
                  divCiudades.appendChild(nombreCiudad)
                  divCiudades.appendChild(editarCiudad)
                  divCiudades.appendChild(eliminarCiudad)
                  console.log(nombreCiudad)
                  divPais.appendChild(divCiudades)
                  divCiudades.setAttribute("class","boxCiudad")
                  editarCiudad.setAttribute("class","editarCiudad")
                  eliminarCiudad.setAttribute("class","eliminarCiudad")
                  nombreCiudad.setAttribute("class","nombreCiudad")
                  
                  editarCiudad.addEventListener('click', function() {
                    updateCity(id_country, cityName)
                })
                  
                function updateCity (id_country, cityName) {
                    newDiv = document.createElement("div");
                    newDiv.classList.add("new_div");
                    newDiv.innerHTML = ` 
                      <div class="bigger_gif">
                        <p>Editar Ciudad</p>
                      </div>
                      <div class="add_company">
                        <form class="formularioCiudadEditar">
                            <div>
                                <p>Nombre Ciudad</p>
                                <input type="name" name="city_name" id="name_city" placeholder="" required />
                                <p>ID asociado a país</p>
                                <input type="name" name="country_id" list="sel_city" id="country_id" placeholder="" required />
                                <datalist id="sel_city" >
                                    <option value="" >-- Select --</option>
                                </datalist>
                            </div>
                        </form>
                      </div>
                      <div class="buttons_company">
                        <button onclick="CerrarCompany()" class="cancel_region">Cancelar</button>
                        <button id="btnEditarCiudad" class="changes">Editar ciudad</button>
                      </div>
                      `;
                    document.body.appendChild(newDiv);
                    document.getElementById('name_city').value = `${cityName}`;
                    document.getElementById("country_id").value = `${id_country}`;


                    async function loadCountries() {
                    let url = "http://localhost:3000/countries"
                
                    let requestInfo = {
                        method: "GET",
                        headers: myHeaders,
                      };
                
                    const response = await fetch(url, requestInfo)
                    const data = await response.json()
                   
                    countriesList(data)
                   
                   
                    }
                
                
                    function countriesList (data) {
                    var ele = document.getElementById('sel_city');
                    console.log(ele)
                    for (var i = 0; i < data.length; i++) {
                        // POPULATE SELECT ELEMENT WITH JSON.
                        ele.innerHTML = ele.innerHTML +
                            '<option value="' + data[i].id + '">' + data[i].name_countries + '</option>';
                        
                        }
                    
                    }

                   const btnEditar = document.getElementById("btnEditarCiudad")
  
                    btnEditar.addEventListener("click", async () =>{
                      let inputCollection = document.querySelectorAll(".formularioCiudadEditar input");
                      let body = {};
                      console.log(inputCollection[0].name)
                      for (let i = 0; i < inputCollection.length; i++){
                          let nombre = inputCollection[i].name
                          let valor = inputCollection[i].value
                          console.log(nombre,valor)
                          body[nombre] = valor
                      }
                      console.log(body)
                      fetch (`http://localhost:3000/cities/${idCiudad}`,
                                      {
                                        method: "PUT",
                                        body: JSON.stringify(body),
                                        headers: myHeaders,
                                      }
                            ).then((res)=>res.json()).then((json)=>{
                              if(json.message=="Ciudad actualizada"){
                                alert("Ciudad actualizada exitosamente")
                                CerrarCompany();
                                location.reload();
                              }else
                                alert("Error al actualizar la ciudad")
                              
                            })
                     
                    })
                    loadCountries();
                }
  
                  eliminarCiudad.addEventListener("click", () => {
                    fetch (`http://localhost:3000/cities/${idCiudad}`,
                                      {
                                        method: "DELETE",
                                        headers: myHeaders,
                                      }
                            ).then((res)=>res.json()).then((json)=>{
                              if(json.message=="Ciudad eliminada"){
                                alert("Ciudad eliminada satisfactoriamente")
                                CerrarCompany();
                                location.reload();
                              }else
                                alert("Error al eliminar ciudad, la misma esta siendo utilizada")
                              
                            })
                    //location.reload()
                  } )
              }
        }   
      
}}
  
console.log(getRegiones)
getRegiones()
    .then(response => showRegiones(response))
  
  /*traer los paises*/
  
async function getPaises(id) {
      const response = await fetch (`http://localhost:3000/countries/${id}`, {method: "GET", headers: myHeaders,} )
      const json = await response.json()
    
      return json
      
}
  
  /*traer las ciudades*/
  
  async function getCiudades (id) {
      const response = await fetch (`http://localhost:3000/cities/${id}`, {method: "GET", headers: myHeaders,})
      const json = await response.json()
    
      return json
      
}


  
  /*función para editar regiones*/
  
const editarRegiones = async (id_regiones,body) => {
    const response = await fetch (`http://localhost:3000/regions/${id_regiones}`,
                                  {
                                    method: "PUT",
                                    body: JSON.stringify(body),
                                    headers: myHeaders,
                                  }
    ).then((res)=>res.json()).then((json)=>{
      if(json.message=="Región actualizada"){
        alert("Región actualizada")
        cargarInfo();
        CerrarCompany();
    
      }else
        alert("Error al actualizar región")
      
    })
    
    //location.reload()
}
  
  
  /*agregar una región*/
  
document.getElementById("agregarRegion").addEventListener("click", ()=>{
    newDiv = document.createElement("div");
    newDiv.classList.add("new_div");
    newDiv.innerHTML = ` 
      <div class="bigger_gif">
        <p>Nueva Región</p>
      </div>
      <div class="add_company">
        <form class="formularioRegiones">
            <div class="divFormulario">
                <p class="nombreRegion">Nombre región</p>
                <input class="entradas" type="name" name="name_region" placeholder="" required />
            </div>
        </form>
      </div>
      <div class="buttons_company">
        <button onclick="CerrarCompany()" class="cancel_region">Cancelar</button>
        <button id="btnCrearRegion" class="changes">Guardar región</button>
      </div>
      `;
    document.body.appendChild(newDiv);
    const btnCrear = document.getElementById("btnCrearRegion")
  
    btnCrear.addEventListener("click", async () =>{
      let inputCollection = document.querySelectorAll(".formularioRegiones input");
      let body = {};
      console.log(inputCollection[0].name)
      for (let i = 0; i < inputCollection.length; i++){
          let nombre = inputCollection[i].name
          let valor = inputCollection[i].value
          console.log(nombre,valor)
          body[nombre] = valor
      }
      console.log(body)
      fetch ("http://localhost:3000/regions",{
          method: "POST",
          body: JSON.stringify(body),
          headers: myHeaders,
      }).then((res)=>res.json()).then((json)=>{
        if(json.status=="Región creada exitosamente"){
          alert("Región creada exitosamente")
          CerrarCompany();
          location.reload();
        }else
          alert("Error al crear región, puede ya exista")
        
      })
      //location.reload()
    })
  
})
  
  /*cerrar div*/
  
function CerrarCompany() {
    document.body.removeChild(newDiv);
};
  


  
