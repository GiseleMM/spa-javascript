import { URL_MASCOTAS, URL_VACUNAS } from "./config.js";

function traerTodas() {
    return fetch(URL_VACUNAS).then(r => r.json());
}
function traerUna(id) {
    if (!id) return Promise.reject("No se sumenistro id");
    return fetch(`${URL_VACUNAS}/${id}`).then(r => r.json());

}
function crear(datos) {

    if (!datos) return Promise.reject("Datos no sumistrados");
    const conf = {
        method: "POST", // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(URL_VACUNAS, conf).then(r => r.json());

}
function eliminar(id) {

    if (!id) return Promise.reject("id no sumistrado");
    const conf = {
        method: "DELETE", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(`${URL_VACUNAS}/${id}`, conf)
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));

}


function actualizar(id, datos) {

    if (!datos || !id) return Promise.reject("Datos no sumistrados");
    const conf = {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(`${URL_VACUNAS}/${id}`, conf).then(r => r.json());
}
export default {
    traerTodas,
    traerUna,
    crear,
    eliminar,
    actualizar
}