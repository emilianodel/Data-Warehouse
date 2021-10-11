const createBtn = document.querySelector('.CrearBtn')

createBtn.addEventListener('click', async ()  => {
    let inputCollection = document.querySelectorAll('.table_users input')
    let body = {}
    for (let i = 0; i < inputCollection.length; i++) {
        let nombre = inputCollection[i].name 
        let valor = inputCollection[i].value 
        body[nombre] = valor
    }
    console.log(body)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(body), 
      headers: {
        'Content-type': 'application/json',

      }
    }).then ((response) => response.json())
    .then((json) => {
      let par = document.createElement('p')
      par.innerHTML = json.message;
      createBtn.after(par)
    })
    
})
   