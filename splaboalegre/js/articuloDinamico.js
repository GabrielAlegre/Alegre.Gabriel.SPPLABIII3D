export default function crearAnuncio(elemento)
{
    const article = document.createElement("article");
    const titulo = document.createElement("h2");
    const descripcion = document.createElement("h3");
    const Animal = document.createElement("h4");
    const precio = document.createElement("p");
    const raza = document.createElement("p");
    const fechaNacimiento = document.createElement("p");
    const vacuna = document.createElement("p");
    const button = document.createElement("Button");
    const div = document.createElement("div");
    
    const iconoRaza = document.createElement("img");
    iconoRaza.setAttribute("src","../img/gatito.png");
    const iconoNacimiento = document.createElement("img");
    iconoNacimiento.setAttribute("src","../img/ciguena.png");
    const iconoVacuna = document.createElement("img");
    iconoVacuna.setAttribute("src","../img/vacunacion.png");
    button.setAttribute("onclick","window.location.href='./index.html'");

    precio.classList.add("precio");    
    raza.classList.add("parrafosImg");
    fechaNacimiento.classList.add("parrafosImg");
    vacuna.classList.add("parrafosImg");

    
    div.appendChild(iconoRaza);
    div.appendChild(raza);
    div.appendChild(iconoNacimiento);
    div.appendChild(fechaNacimiento);
    div.appendChild(iconoVacuna);
    div.appendChild(vacuna);
    
    article.appendChild(titulo);
    article.appendChild(descripcion);
    article.appendChild(Animal);
    article.appendChild(precio);
    article.appendChild(div);
    article.appendChild(button);
    
    article.classList.add("card");

    titulo.textContent = `Titulo: ${elemento.titulo}`;
    Animal.textContent = `Animal: ${elemento.animal}`;
    descripcion.textContent =  `Descripcion: ${elemento.descripcion}`;
    precio.textContent = `Precio: $ ${elemento.precio}`
    raza.textContent = `Raza: ${elemento.raza}`;
    fechaNacimiento.textContent =`${elemento.fechaNacimiento}`;
    vacuna.textContent = `Vacuna: ${elemento.vacuna}`;
    button.textContent = "Ver Mascota"
    
    return article;
}