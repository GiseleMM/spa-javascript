import { MASCOTAS} from "../config.js";
import { convertirMDYYYY ,esValidaFechaMDYYYY} from "../fecha.js";

export function validarInputsFormulario(entidad, datos) {
    let valido;
    if (entidad == MASCOTAS) {
        console.log("MASCOTA>>>>");
        valido = validarInputsMascota(datos);

    } else {
        console.log("VACUNAS>>>>");

        valido = validarInputsVacuna(datos);

    }
    return valido;
}
function validarInputs(input, predicate) {
    return input != null && predicate(input);

}
function validarInputsMascota({ id, nombre, especie, fechaNacimiento, sexo }) {
    let errores = [];
    console.log("MASCOTAS :)");


    console.log("NO SE ACEPTAn :", nombre, especie);
    if (!nombre || !especie || !fechaNacimiento || !sexo) errores.push("No se aceptan valores null");

    if (id != null && validarInputs(id, (i) => isNaN(Number(i)))) errores.push("id invalido");

    if (nombre && especie && sexo && (validarInputs(nombre, n => n.trim() == "") || validarInputs(sexo, s => s.trim() == "") || validarInputs(especie, e => e.trim() == ""))) errores.push("espeacio en blanco no se acepta");

    if (fechaNacimiento && !esValidaFechaMDYYYY(fechaNacimiento)) errores.push("Fecha no valida");

    if (errores.length > 0) return errores;
    return true;
}
function validarInputsVacuna({
    id,
    nombre,
    fecha,
    dosis,
    proxima,
    matriculaVeterinario,
    idMascota
}) {
    const errores = [];


    if (!nombre || !fecha || !dosis  || !matriculaVeterinario || !idMascota) errores.push("Todos los campos son requeridos");

    if(nombre!=null && nombre.trim().length===0) errores.push("Nombre  incompleto");
    
    if(dosis!=null && dosis.trim().length===0) errores.push("Dosis  incompleto");

    if(matriculaVeterinario!=null && matriculaVeterinario.trim().length===0) errores.push("Matricula  incompleto");

    if (id != null && validarInputs(id, (i) => isNaN(Number(i)))) errores.push("id invalido");

    if (fecha && proxima && (!esValidaFechaMDYYYY(fecha) || !esValidaFechaMDYYYY(proxima))) errores.push("fecha invalida");

    if (idMascota != null && validarInputs(idMascota, (i) => isNaN(Number(i)))) errores.push("Mascota invalida ");


    if (errores.length > 0) return errores;
    return true;

}
export function obtenerDatosDelFormulario(formulario, entidad) {
    console.log("Formulario", formulario);
    console.log("Entidad", entidad);

    let retorno = null;
    if (entidad == MASCOTAS) {
        let id = formulario.floatingId?.value;
        let nombre = formulario.floatingNombre?.value;
        let especie = formulario.floatingEspecie?.value;
        let cumple = formulario.floatingFechaNacimiento?.value;
        let sexo = formulario.sexo?.value;
        console.log(id, nombre, especie, cumple, sexo);



        let fechaNacimiento = convertirMDYYYY(cumple);

        retorno = {
            "id": id,
            "nombre": nombre,
            "especie": especie,
            "fechaNacimiento": fechaNacimiento,
            "sexo": sexo
        }

    } else {
        let id = formulario.floatingId?.value;
        let nombre = formulario.floatingNombre?.value;
        let fecha = formulario.floatingFecha?.value;
        let dosis = formulario.floatingDosis?.value;
        let proxima = formulario.floatingProxima?.value;
        let matricula = formulario.floatingMatricula?.value;
        let idMascota = formulario.floatingSelect?.value;
        console.log(fecha);
        console.log(proxima);

        let f = fecha && fecha.trim()!=""?convertirMDYYYY(fecha):null;
        let p = proxima && proxima.trim()!=""?convertirMDYYYY(proxima):null;

        retorno = {
            "id": id,
            "nombre": nombre,
            "fecha": f,
            "dosis": dosis,
            "proxima": p,
            "matriculaVeterinario": matricula,
            "idMascota": idMascota
        }

    }
    console.log("RETORNO:>>>>>>>>>>>>>>>>", retorno)
    return retorno;
}
