import { verificarQueCampoNoEsteVacio, verificarQueSeanTodoNumerosEnterosPositivos, verificarQueSeanUnPrecioValido, validarSubmit, verificarQueNoExcedaCaracteres} from "./validaciones.js";
import AnuncioMascota from "./anuncioMascota.js";
import { crearTablaDinamica } from "./tablaDinamica.js";
import { getAnunciosAjax, createAnuncioAjax, deleteAnuncioFetch, anuncios, updateAnuncioFetch} from "./peticiones.js";
export { actualizarTabla};   

const $formulario = document.forms[0];
const controles = $formulario.elements;
const $divTabla = document.getElementById("divTabla");
const checkBoxes = document.querySelectorAll('.checkBoxes');
let listaActual=anuncios;

getAnunciosAjax();

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!validarSubmit(controles))
    {
        return null;
    }
    const {txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna, txtId} = $formulario;
    const anuncio = new AnuncioMascota(txtId.value, txtTitulo.value, rdoAnimal.value, txtDescripcion.value, txtPrecio.value, txtRaza.value, txtFechaNacimiento.value, selectVacuna.value);
    anuncio.id === '' ? handlerAlta(anuncio) : handlerModificar(anuncio);
    limpiarFormulario($formulario);
});

document.addEventListener("click", (e)=>{
    const emisorDelEvento = e.target;
    if(emisorDelEvento.matches("td"))
    {
        let idDelObjetoSeleccionado = emisorDelEvento.parentElement.dataset.id;
        const objetoRecuperado = anuncios.find((objeto)=>objeto.id==idDelObjetoSeleccionado)
        cargarFormularioConDatos(objetoRecuperado);
    }
    else if(emisorDelEvento.matches("#btnEliminar"))
    {
        let idDelAnuncioQueSeEliminara=parseInt($formulario.txtId.value);
        handlerEliminar(idDelAnuncioQueSeEliminara);
        limpiarFormulario($formulario);
    }
    else if(emisorDelEvento.matches("#btnCancelar"))
    {
        limpiarFormulario($formulario);
    }
    else if (emisorDelEvento.matches(".checkBoxes"))
    {
        actualizarTablaConColumnasSeleccionadasMap();
    }
});

document.getElementById('filtro').addEventListener('change', ()=> {
    let opcionElegida = document.getElementById('filtro').value;
    const anunciosFiltrados = opcionElegida != "Todos" ? anuncios.filter( anuncio=> anuncio.animal == opcionElegida):anuncios;
    let promedio = opcionElegida != "Todos" ? anunciosFiltrados.reduce((acumulador, actual) => { return acumulador + Number(actual.precio)},0)/anunciosFiltrados.length:"N/A";
    document.getElementById('txtPromedio').value=promedio;
    listaActual=anunciosFiltrados;
    actualizarTablaConColumnasSeleccionadasMap();
});

const actualizarTablaConColumnasSeleccionadasMap = () =>{
    const atibutosConCheck = {};
    checkBoxes.forEach((chk) => {
        atibutosConCheck[chk.value] = chk.checked;
    });

    console.log(atibutosConCheck);
    if(listaActual.length==0)
        listaActual=anuncios;
    
    const listaMapeadaConColumnasSeleccionadas = listaActual.map((unAnuncio) => {
        const objetoConLosAtributosEnCheck = {};
        for (const propiedad in unAnuncio) {
            if (atibutosConCheck[propiedad] || propiedad == "id") {
                objetoConLosAtributosEnCheck[propiedad] = unAnuncio[propiedad];
            }
        }
        return objetoConLosAtributosEnCheck;
    });
    actualizarTabla(listaMapeadaConColumnasSeleccionadas);
}

const handlerAlta = (objetoQueSeDaraDeAlta)=>{
    anuncios.push(objetoQueSeDaraDeAlta);
    createAnuncioAjax(objetoQueSeDaraDeAlta);
}

const handlerModificar = (anuncioModificado)=>{
    let indice = anuncios.findIndex((anuncio)=>anuncio.id == anuncioModificado.id); 
    anuncios.splice(indice, 1);
    anuncios.push(anuncioModificado);
    updateAnuncioFetch(anuncioModificado);
}

const handlerEliminar = (id)=>{
    let indice = anuncios.findIndex((anuncio) => anuncio.id == id); 
    anuncios.splice(indice, 1);
    deleteAnuncioFetch(id);    
}

function limpiarFormulario(frm){
    frm.reset();
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnCancelar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Guardar";
    $formulario.txtId.value = "";
}

function actualizarTabla(anuncios){
    borrarTabla();
    if(anuncios){
        anuncios.sort((a,b)=>{
            return a.precio-b.precio;
        })
        $divTabla.appendChild(crearTablaDinamica(anuncios));
    }
}

function borrarTabla(){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild)
    }
}

function cargarFormularioConDatos(anuncio)
{
    const {txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtFechaNacimiento, selectVacuna, txtId} = $formulario;

    txtId.value=anuncio.id;
    txtTitulo.value=anuncio.titulo;
    rdoAnimal.value=anuncio.animal;
    txtDescripcion.value=anuncio.descripcion;
    txtPrecio.value=anuncio.precio;
    txtRaza.value=anuncio.raza;
    txtFechaNacimiento.value=anuncio.fechaNacimiento;
    selectVacuna.value=anuncio.vacuna;

    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
    document.getElementById("btnCancelar").classList.remove("oculto");
}

for (const control of controles) {

    if(control.matches("input") && control.matches("[type=number]") || control.matches("[type=text]"))
    {
        control.addEventListener("blur", verificarQueCampoNoEsteVacio);
        control.addEventListener("keyup", verificarQueCampoNoEsteVacio);

        if(control.matches("[type=number]") && control.name == "Precio")
        {
            control.addEventListener("blur", verificarQueSeanUnPrecioValido) ;
            control.addEventListener("keyup", verificarQueSeanUnPrecioValido) ;
        }
        else if(control.matches("[type=number]"))
        {
            control.addEventListener("blur", verificarQueSeanTodoNumerosEnterosPositivos);
            control.addEventListener("keyup", verificarQueSeanTodoNumerosEnterosPositivos);
        }
        else if(control.matches("[type=text]") && control.name == "Titulo" || control.matches("[type=text]") && control.name == "Descripcion")
        {
            control.addEventListener("blur", verificarQueNoExcedaCaracteres);
            control.addEventListener("keyup", verificarQueNoExcedaCaracteres);
        }
    }
}