export const verificarQueCampoNoEsteVacio = (e)=>{

    const inputQueSeValidara = e.target;
    const valueDelInput = inputQueSeValidara.value.trim();

    valueDelInput ? borrarError (inputQueSeValidara) : setError(inputQueSeValidara);
};

const setError = (input, mensaje) =>{
    const span =  input.nextElementSibling;
    span.textContent = mensaje || `${input.name} sin ingresar`
    input.classList.add("inputError");
    span.classList.add("advertencia");
    input.classList.remove("inputValidado");
};

const borrarError = (input) =>{
    const span =  input.nextElementSibling;
    span.textContent = "";
    input.classList.remove("inputError");
    span.classList.remove("advertencia");
    input.classList.add("inputValidado");

};

export const verificarQueSeanTodoNumerosEnterosPositivos = (e)=>{
    const pattern = /(^\d{1,10}$)/g;
    const inputQueSeValidara = e.target;
    const valorIngresado = inputQueSeValidara.value.trim();

    if(valorIngresado.length>10){
        setError(inputQueSeValidara, "Numero excedido");
    }
    else{
        pattern.test(valorIngresado) ? borrarError(inputQueSeValidara) : setError(inputQueSeValidara, "Debe ingresar un numero positivo y entero");
    }

};

export const verificarQueSeanUnPrecioValido = (e)=>{
    const pattern = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;
    const inputQueSeValidara = e.target;
    const valorIngresado = inputQueSeValidara.value.trim();

    if(valorIngresado<0 || valorIngresado>50000){
        setError(inputQueSeValidara, "Ingrese un numero positivo entre 0 y 50000");
    }
    else if (valorIngresado==0){
        borrarError(inputQueSeValidara)
    }
    else{
        pattern.test(valorIngresado) ? borrarError(inputQueSeValidara) : setError(inputQueSeValidara, "Solo puede ingresar numeros");
    }

};

export const verificarQueNoExcedaCaracteres = (e)=>{
    const inputQueSeValidara = e.target;
    const valorIngresado = inputQueSeValidara.value.trim();

    if(valorIngresado.length>25)
    {
        setError(inputQueSeValidara, "* Solo puede ingresar como maximo 25 Caracteres");
    }
};

export function validarSubmit(controles){
    let todoOka=true;
    for (const unControl of controles) {
        
        if(!unControl.matches("[type=submit]") && !unControl.matches("[type=hidden]") && !unControl.matches("[type=button]"))
        {
            if(unControl.classList.contains("inputError"))
            {
                console.log(`No se enviaron los datos porque el campo '${unControl.name}' es invalido`);
                todoOka = false;
            }
            else if(unControl.value==""){
                console.log(`No se enviaron los datos porque el campo '${unControl.name}' esta vacio`);
                setError(unControl);
                todoOka = false;
            }
            else{
                unControl.classList.remove("inputValidado");
            }
        }
    }
    return todoOka;
}


