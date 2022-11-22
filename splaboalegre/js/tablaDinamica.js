function crearThead(unObjeto)
{
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    for (const key in unObjeto)
    {
        if(key !== "id")
        {
            const th = document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }
    }

    thead.appendChild(tr);

    return thead;
}

function crearTbody(arrayDeObjetos)
{
    const tbody = document.createElement("tbody");

    arrayDeObjetos.forEach((elemento, index) => {

        const tr = document.createElement("tr");
        
        for(const atributo in elemento) 
        {
            if(atributo === "id")
            {
                tr.setAttribute("data-id", elemento[atributo]);
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = elemento[atributo];
                tr.appendChild(td); 
                tr.classList.add("puntero");
            }
        }
        
        tbody.appendChild(tr);
        if(!(index % 2))
        {
            tr.classList.add("gris");
        }
    });
    
    return tbody;
}

export function crearTablaDinamica(arrayDeObjetos)
{
    if(!Array.isArray(arrayDeObjetos))
    {
        return null;
    }
    const tabla= document.createElement("table");
    tabla.appendChild(crearThead(arrayDeObjetos[0]));
    tabla.appendChild(crearTbody(arrayDeObjetos));
    tabla.setAttribute("class", "col-6 p-0 justify-content-center");
    return tabla;
}