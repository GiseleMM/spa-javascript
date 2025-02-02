import { MODO_EDIT, MODO_DELETE, MODO_NEW, MASCOTAS, VACUNAS, HOME, routerOutlet } from "./config.js";
import Mascotas from "./mascotas.js";
import Vacunas from "./vacunas.js";

import { crearFormulario } from "./formulario/form.js";

import { crearVistaEntidad, crearVistaForm, crearVistaHome, showModal, showPreloader } from "./views.js";

import { validarInputsFormulario, obtenerDatosDelFormulario } from "./formulario/validacion.js"
import { prepararDatosParaFormulario,submitFormulario } from "./formulario/util.js";



export async function handlerBottonNewClick(event) {

    showPreloader()
    const target = event.target;
    try {
        console.log(target);
        if (!target.matches("botton[data-entidad]")) return;

        let mascotas = await Mascotas.traerTodas();


        console.log("boton", target.dataset.entidad);
        const formulario = handlerNewForm(event, mascotas);
        if (formulario) crearVistaForm(routerOutlet, "Complete datos:", formulario, handlerSubmitFormulario);

    } catch (error) {
        console.log(error.message);
    }

}
export async function handlerTablaClick(event) {
    showPreloader();
    const mascotas = await Mascotas.traerTodas();
    const vacunas = await Vacunas.traerTodas();

    const target = event.target;
    console.log("ACCCION", target.dataset.accion);


    const { formulario, accion } = handlerEditDeleteForm(event, mascotas, vacunas);
    if (formulario && accion) {
        crearVistaForm(routerOutlet, accion.toUpperCase(), formulario, handlerSubmitFormulario)
    }

}


export function handlerNavClick(event) {


    const target = event.target;
    if (target == null || target.dataset.nav == null) return;

    console.log(target.dataset.nav);
    switch (target.dataset.nav) {
        case MASCOTAS:
            // crearVistaEntidad(routerOutlet, MASCOTAS, mascotas);
            crearVistaEntidad(MASCOTAS);
            break;
        case HOME:
            crearVistaHome();
            break;
        case VACUNAS:
            crearVistaEntidad(VACUNAS);
            break;

        default:
            break;
    }

}
/**
 * 
 * @param {click a dt de tabla} event 
 * @param {array de mascotas} mascotas 
 * @param {array de vacunas} vacunas 
 * @returns {formulario,accion}
 */
export function handlerEditDeleteForm(event, mascotas, vacunas) {
    console.log("handler editDelete------------------------")
    const target = event.target;
    let formulario = null;
    let dato = null;

    if (!target) return;

    if (!target.matches("table tr td[data-accion]")) return;

    const idFila = target.parentNode.dataset.id;
    const accion = target.dataset.accion;
    const entidad = target.parentNode.dataset.entidad;
    // console.log("idFila accion entidad", idFila, accion, entidad);

    dato = prepararDatosParaFormulario(entidad, entidad == MASCOTAS ? mascotas : vacunas, idFila);
    console.log("dato:", dato);

    formulario = crearFormulario(accion, entidad, entidad == VACUNAS ? mascotas : null, dato);

    console.log("handler editDelete", { formulario, accion })
    return { formulario, accion };
}

export function handlerNewForm(event, mascotas = null) {
    const target = event.target;
    if (!target.matches("botton[data-entidad]")) return;

    const entidad = target.dataset.entidad;
    console.log("handlerNewForm tengo:", entidad);

    //si la entidad es vacuna le paso las mascotas para q eliga el select
    const formulario = crearFormulario(MODO_NEW, entidad, entidad == VACUNAS ? mascotas : null, null);
    return formulario;

}
// function handlerOkAccionForm(tituloModal, textoModal, entidad) {
//     showModal(tituloModal, textoModal);
//     crearVistaEntidad(entidad);
// }

// async function submitFormulario(accion, entidad,datos = null, id = null) {

//     let result;

//     try {
//         let Entidad = entidad == MASCOTAS ? Mascotas : Vacunas;


//         switch (accion) {
//             case MODO_DELETE:
//                 result = entidad == MASCOTAS
//                     ? await Entidad.eliminarMascotaYVacunas(id)
//                     : await Entidad.eliminar(id);
//                 console.log(result);
//                 handlerOkAccionForm(accion, "Se eliminó correctamente  ✔️", entidad);
//                 break;
//             case MODO_EDIT:
//                 if (datos == null || id == null) throw new Error("Id o datos no suministrados");
//                 result = await Entidad.actualizar(id, datos);
//                 console.log(result);
//                 handlerOkAccionForm(accion, "Se editó correctamente ✔️", entidad);
//                 break;
//             case MODO_NEW:
//                 if (datos == null) throw new Error("Datos no suministrados");
//                 result = await Entidad.crear(datos);
//                 console.log(result);
//                 handlerOkAccionForm(accion, "Se creó correctamente ✔️", entidad);
//                 break;
//             default:
//                 throw new Error("Acción desconocida");
//         }
//     } catch (error) {
//         console.error(error);
//         showModal("Error ⚠️", `Error en ${accion.toLowerCase()}`);
//     }
// }


export function handlerSubmitFormulario(event) {

    const target = event.target;
    event.preventDefault();
    console.log("submit", target);
    if (!target.matches("form")) return;

    console.log("id:", target.floatingId);// es edicion
    const accion = target.dataset.modo;
    const entidad = target.dataset.entidad.trim();
    const id = target.floatingId?target.floatingId.value.trim():null;
    if (accion == null || entidad == null) return;


    let datos = accion==MODO_EDIT || accion==MODO_NEW?obtenerDatosDelFormulario(target, entidad):null;
    console.log("entidad:>>>>", entidad)
    let esValido = datos!=null?validarInputsFormulario(entidad, datos):null;
    if (Array.isArray(esValido)  && (accion==MODO_EDIT || accion==MODO_NEW )) {
        console.log("Array de errores", esValido);
        showModal("Error ⚠️", esValido.join("❗"));
           return;
    }
    try {
        submitFormulario(accion, entidad,datos, id);

    } catch (error) {
        showModal("Error ⚠️", error.message);

    }

}