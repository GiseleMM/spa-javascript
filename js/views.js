//vistas
import { MASCOTAS, VACUNAS, routerOutlet} from "./config.js";
import Data from "./data.js";

import { crearH2, crearBotonNew, limpiarContenedor, crearPreloader, crearIconoWarning } from "./dom.js";
import { crearCards } from "./card/card.js";
import { crearTabla } from "./tabla/table.js";
import { crearDateConFechaMDY } from "./fecha.js";
/**
 * 
 * @param {h2} titulo 
 * @param {datos para creacion de tabla} datos 
 * @param {mensaje para boton nuevo} nuevo 
 * @returns {h2,botton,table}
 */ 
function crearVistaListado(titulo, datos, nuevo) {
    const h2 = crearH2(titulo);
    const botton = crearBotonNew(nuevo);
    // console.log("datos:", datos);
    const tabla = crearTabla(datos);

    h2.classList.add("text-center");
    h2.classList.add("p-3");

    tabla.classList.add("table", "table-sm", "rounded");
    // console.log("TAbla:", tabla);

    return { h2, botton, tabla };
}

function crearConfiguracionParaVistaEntidad(entidad, array) {
    let conf = {};
    if (entidad == MASCOTAS) {
        conf = { "titulo": "Listado de mascotas 🐶​​🐈​🦄​", "datos": array, "nuevo": "Nueva mascota" }
    } else {
        conf = { "titulo": "Listado de vacunas 💉", "datos": array, "nuevo": "Nueva vacuna" }
    }
    return conf;
}


function mapVacunasParaTabla(vacunas, mascotas) {

    return vacunas.map(v => {
        let m = mascotas.find(m => m.id == v.idMascota);
        return {
            ...v,
            "mascota": m ? m.nombre : "",
        }
    })

}

export async function crearVistaEntidad(entidad) {
    showPreloader(routerOutlet);

    let array = null;
    const mascotas = await Data.mascotas();
    const vacunas = await Data.vacunas();

    array = mascotas;
    if (entidad == VACUNAS) {
        array = mapVacunasParaTabla(vacunas, mascotas);

    }
    const conf = crearConfiguracionParaVistaEntidad(entidad, array);
    const { h2, botton, tabla } = crearVistaListado(conf.titulo, conf.datos, conf.nuevo);
    h2.classList.add("p-3");


    botton.dataset.entidad = entidad;//para saber q entidad es la del boton

    limpiarYColocarElementos(routerOutlet, h2, botton, tabla);

}
export function limpiarYColocarElementos(routerOutlet, ...nodos) {
    limpiarContenedor(routerOutlet);
    nodos.forEach(element => {
        routerOutlet.appendChild(element);
    });

}

function obtenerProximaVacuna(vacunas) {


    return vacunas
        .map(v => ({
            proxima: crearDateConFechaMDY(v.proxima),
            idMascota: v.idMascota,
            nombre: v.nombre
        }))
        .filter(v => v.proxima !== null)
        .sort((a, b) => a.proxima - b.proxima);


}

function asociarMascotasAProximaVacuna(vacunasConFecha, mascotas) {
    return vacunasConFecha.map(v => {

        const mascota = mascotas.find(m => m.id == v.idMascota);
        console.log("map:", { ...v, mascota: mascota ? mascota.nombre : '' });
        return { ...v, mascota: mascota ? mascota.nombre : '' };
    }).filter(v => v.mascota != "");
}


function proximaVacunas(mascotas, vacunas) {
    const vacunasConFecha = obtenerProximaVacuna(vacunas);
    return asociarMascotasAProximaVacuna(vacunasConFecha, mascotas).filter(v => new Date(v.proxima) > new Date());
}


export async function crearVistaHome() {
    showPreloader();

    try {
        let mascotas = await Data.mascotas();
        let vacunas = await Data.vacunas();
        let h2 = crearH2("Proximas vacunas 👀​⚠️​");
        h2.classList.add("p-3");

        limpiarContenedor(routerOutlet);
        const aux3 = proximaVacunas(mascotas, vacunas);
        if (aux3 == null || aux3.length == 0) {
            //en caso de q no haya proxima cita de vacunas
            h2 = crearH2("Estas al dia con las vacunas 👍​");

            routerOutlet.appendChild(h2);

        } else {
            const cards = crearCards(aux3);
            routerOutlet.appendChild(h2);
            routerOutlet.appendChild(cards);
        }




    } catch (error) {
        console.log(error);
        console.log(error.message);
        showErrorPage("Lo sentimos, el servidor no esta funcionando");
    }


}



export function showPreloader() {
    console.log("Show preloader")
    if (routerOutlet == null) return;

    const preloader = crearPreloader();
    limpiarYColocarElementos(routerOutlet, preloader);

}
export function crearVistaForm(routerOutlet, titulo, formulario, submithandler) {
    if (routerOutlet && titulo && formulario && submithandler) {
        const h2 = crearH2(titulo);
        h2.classList.add("p-3");
        formulario.addEventListener("submit", submithandler);
        limpiarYColocarElementos(routerOutlet, h2, formulario);
    }

}

export function showModal(titulo, mensaje) {
    // Obtén el modal que está en el index
    const myModalElement = document.getElementById('exampleModal');
    const myModal = new bootstrap.Modal(myModalElement);  // Usamos myModalElement directamente
    let tituloModal = document.getElementById("exampleModalLabel");
    tituloModal.innerHTML = titulo;
    let bodyModal = document.getElementById("modalBody");

    bodyModal.innerHTML = mensaje;

    // Mostrar el modal usando la instancia de bootstrap.Modal
    myModal.show();
//     // myModal.setAttribute('aria-hidden', 'false'); NO ES UN ELEMENTO DEL DOM ES DE BOOTSTRAP

    myModalElement.addEventListener("hidden.bs.modal", () => {
                console.log("Cerrando el modal");
        
            });
    // Aquí ya no es necesario manipular el atributo aria-hidden
    // Bootstrap se encarga del manejo del enfoque y la accesibilidad automáticamente
}


export function showErrorPage( mensaje) {
    if (routerOutlet) {
        // const imgError=crearImagen("./assets/error-icon-25266.png","Error imagen");
        const div = document.createElement("DIV");
        div.classList.add("d-flex", "flex-column", "mb-3", "align-items-center");

        const iconoError = crearIconoWarning();
        //style="font-size: 2rem; color: cornflowerblue;"
        iconoError.style.fontSize = "10rem";
        iconoError.style.color = "red";

        const h2 = crearH2(mensaje);
        div.appendChild(h2);
        div.appendChild(iconoError);
        limpiarYColocarElementos(routerOutlet, div);

    }
}
