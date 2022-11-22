import Anuncio from "./anuncio.js";

export default class AnuncioMascota extends Anuncio {
    constructor(id, titulo, animal, descripcion, precio, raza, fechaNacimiento, vacuna) {
        super(id, titulo, animal, descripcion, precio);
        this.raza = raza ;
        this.fechaNacimiento = fechaNacimiento ;
        this.vacuna = vacuna;
    }
}