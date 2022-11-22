import { actualizarTabla } from "./app.js";  
export { getAnunciosAjax, createAnuncioAjax, deleteAnuncioFetch, updateAnuncioFetch, anuncios, agregarSpinner, eliminarSpinner};

const URL="http://localhost:3000/animales";
let anuncios = [];

function agregarSpinner(mensajeInformativo){
    let spinner = document.createElement("img");
    const h3 = document.createElement("h3");
    spinner.setAttribute("src","./img/spinner.webp");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("divSpinner").appendChild(spinner);
    document.getElementById("divSpinner").appendChild(h3);
    h3.textContent = mensajeInformativo;
}

function eliminarSpinner(){
  const divSpinner=document.getElementById("divSpinner");
  while(divSpinner.hasChildNodes()){
      divSpinner.removeChild(divSpinner.firstElementChild);
  }
}

/////////////////////////////////////////// GET //////////////////////////
//GET AJAX XMLHttpRequest
function getAnunciosAjax(){
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;     
          actualizarTabla(anuncios);    

        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);          
        }
        eliminarSpinner();          
      } else {
        agregarSpinner("Cargando anuncios......");
      }    
    };  
    xhr.open("GET", URL);
    xhr.send();
  };

/////////////////////////////////////////// POST //////////////////////////
//post con ajax XMLHttpRequest
const createAnuncioAjax= (nuevoAnuncio) =>{
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', () =>{
      if(xhr.readyState == 4)
      {
          if(xhr.status >= 200 && xhr.status < 300)
          {
            const data = JSON.parse(xhr.responseText);
            anuncios = data;
            console.log("Se dio de alta correctamente al siguiente anuncio:"+data);
            alert("Alta correcta");
          }
          else
          {
            console.error(`Error ${xhr.status} : ${xhr.statusText}`);
          } 
          eliminarSpinner(); 
      }
      else
      {
        agregarSpinner("Dando de alta el anuncio....");
      }
  });

  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.send(JSON.stringify(nuevoAnuncio));
};

/////////////////////////////////////////// PUT //////////////////////////
//Put con fecht promesas
const updateAnuncioFetch = (anuncioModificado) =>{
  const options = {
      method: "PUT",
      headers: {
          "Content-Type":"application/json"
      },
      body: JSON.stringify(anuncioModificado),
  };
  agregarSpinner("Modificando anuncio...");

  fetch(URL + "/" + anuncioModificado.id, options)
  .then(res => res.ok ? res.json():Promise.reject(`Error ${res.status} : ${res.statusText}`))
  .then(data => { 
    let mascotaYaModificada=data;
    console.log("Modificacion correcta, el animal ya con los datos ya editados es el siguiente:"+mascotaYaModificada);
    alert("Modificacion existosa");
  })
  .catch(err => {
      console.error(err);
  })
  .finally(()=>{
    eliminarSpinner();
  })
};

/////////////////////////////////////////// DELETE //////////////////////////
//eliminar con fetch promesas
const deleteAnuncioFetch = (id) =>{
  agregarSpinner("Eliminando anuncio......");
  const options = {
      method: "DELETE",
  };
  fetch(URL + "/" + id, options)
  .then(res => res.ok ? res.json():Promise.reject(`Error ${res.status} : ${res.statusText}`))
  .then(data => { 
    alert("Se elimino el anuncio correctamente");
  })
  .catch(err => {
      console.error(err);
  })
  .finally(()=>{
    eliminarSpinner(); 
  })
};