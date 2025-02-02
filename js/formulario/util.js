import Mascotas from "../mascotas.js";
import Vacunas from "../vacunas.js";
import { showModal } from "../views.js";
import { MASCOTAS,MODO_DELETE,MODO_EDIT ,MODO_NEW} from "../config.js";
import { parsearFechaMDY, parsearFechaHTML } from "../fecha.js";

export function prepararDatosParaFormulario(entidad, source, id) {
    console.log("Entidad:", entidad);
    console.log("Source:", source);
    console.log("ID:", id);

    let dato = source.find(m => m.id == id);
    console.log("preparando dato:", dato);
    let aux = { ...dato }

    if (entidad == MASCOTAS) {
        let { mes, dia, anio } = parsearFechaMDY(aux.fechaNacimiento);
        aux.fechaNacimiento = parsearFechaHTML(mes, anio, dia);//date html  yyyy-MM-dd

    } else {

        let { mes, dia, anio } = parsearFechaMDY(aux.fecha);
        aux.fecha = parsearFechaHTML(mes, anio, dia);
        // console.log("proxima:", aux.proxima);
        if (aux.proxima != null) {
            let { mes: mesP, dia: diaP, anio: anioP } = parsearFechaMDY(aux.proxima);
            // console.log("fecha proxima:", mesP, diaP, anioP);
            aux.proxima = parsearFechaHTML(mesP, anioP, diaP);

        }

    }
    console.log("retorno:", aux);
    return aux;
}

function handlerOkAccionForm(tituloModal, textoModal, entidad) {
    showModal(tituloModal, textoModal);
    crearVistaEntidad(entidad);
}
 export async function submitFormulario(accion, entidad,datos = null, id = null) {

    let result;

    try {
        let Entidad = entidad == MASCOTAS ? Mascotas : Vacunas;

        switch (accion) {
            case MODO_DELETE:
                result = entidad == MASCOTAS
                    ? await Entidad.eliminarMascotaYVacunas(id)
                    : await Entidad.eliminar(id);
                console.log(result);
                handlerOkAccionForm(accion, "Se eliminó correctamente  ✔️", entidad);
                break;
            case MODO_EDIT:
                if (datos == null || id == null) throw new Error("Id o datos no suministrados");
                result = await Entidad.actualizar(id, datos);
                console.log(result);
                handlerOkAccionForm(accion, "Se editó correctamente ✔️", entidad);
                break;
            case MODO_NEW:
                if (datos == null) throw new Error("Datos no suministrados");
                result = await Entidad.crear(datos);
                console.log(result);
                handlerOkAccionForm(accion, "Se creó correctamente ✔️", entidad);
                break;
            default:
                throw new Error("Acción desconocida");
        }
    } catch (error) {
        console.error(error);
        showModal("Error ⚠️", `Error en ${accion.toLowerCase()}`);
    }
}
