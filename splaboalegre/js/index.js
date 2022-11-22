import crearCarta from "./articuloDinamico.js";
const URL="http://localhost:3000/animales";
const $sectionAnuncios = document.getElementById("anunciosMascotas");

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

function getAnuncios(){
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          data.forEach(element => {
            $sectionAnuncios.appendChild(crearCarta(element));
        });
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

getAnuncios();
