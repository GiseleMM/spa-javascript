import { MODO_DELETE,MODO_EDIT,VACUNAS,MASCOTAS } from "../config.js";
export function crearTabla(datos) {


    const table = document.createElement("TABLE");;
    if (datos) {
        let datosMap = mapDatos(datos);
        const thead = crearThead(datosMap[0]);
        const tbody = crearTbody(datosMap);


        if (thead && tbody) {

            table.appendChild(thead);
            table.appendChild(tbody);
        }
    }


    return table;

}

function ordenarAtributosObjeto(dato) {
    let keys = Object.keys(dato);
    console.log("keys", keys);
    return keys.sort((a, b) => a.localeCompare(b));
}

function mapDatos(datos) {
    return datos.map(elemento => {

        let keys = ordenarAtributosObjeto(elemento);
        let objKeys = {};
        keys.forEach(k => { objKeys[k] = elemento[k] });
        return {
            ...objKeys,
            "edicion": MODO_EDIT,
            "eliminacion": MODO_DELETE
        }
    })
}
function crearThead(dato) {


    const thead = document.createElement("THEAD");
    if (dato) {
        const tr = document.createElement("TR");
        for (const key in dato) {
            const th = document.createElement("TH");
            th.innerHTML = key;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    }

    return thead;

}
function crearTbody(datos) {

    const tbody = document.createElement("TBODY");
    if (datos) {

        datos.forEach(element => {

            const tr = document.createElement("TR");
            //para identificar q entidad es en la delegacion de eventos
            element.hasOwnProperty("especie") ? tr.dataset.entidad = MASCOTAS : tr.dataset.entidad = VACUNAS;


            for (const key in element) {

                const td = document.createElement("TD");
                td.innerHTML = element[key];
                if (key == "id") tr.dataset.id = element[key];

                if (key == "edicion") {
                    td.dataset.accion = MODO_EDIT;
                    td.innerHTML = "✏️";
                }

                if (key == "eliminacion") {
                    td.dataset.accion = MODO_DELETE;
                    td.innerHTML = "❌";
                }


                tr.appendChild(td);
            }
            tbody.appendChild(tr);

        });
    }
    return tbody;
}