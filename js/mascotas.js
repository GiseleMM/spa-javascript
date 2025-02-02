import { URL_MASCOTAS, URL_VACUNAS } from "./config.js";

function traerTodas() {
    return fetch(URL_MASCOTAS)
        .then(response => response.json());
}
function traerUna(id) {
    if (!id) return Promise.reject("id no suministrado");
    return fetch(`${URL_MASCOTAS}/${id}`).then(response => response.json());
}
function crear(data)
{

   return  fetch(URL_MASCOTAS, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));


}

function actualizar(id,data)
{
  return  fetch(`${URL_MASCOTAS}/${id}`, {
    method: "PUT", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
    
}

function eliminar(id)
{
  return  fetch(`${URL_MASCOTAS}/${id}`, {
    method: "DELETE", // or 'PUT'!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
    
}
export function eliminarMascotaYVacunas(idMascotaEliminar) {

  return new Promise((resolve, reject) => {
    // Paso 1: Eliminar las vacunas asociadas a esta mascota
    fetch(`${URL_VACUNAS}?idMascota=${idMascotaEliminar}`)
      .then(response => response.json())
      .then(vacunas => {
        // Eliminar cada vacuna asociada a la mascota
        const promesasEliminacionVacunas = vacunas.map(vacuna => {
          return fetch(`${URL_VACUNAS}/${vacuna.id}`, {
            method: 'DELETE'
          }).then(res => res.json());
        });

        // Esperamos a que todas las vacunas se eliminen
        Promise.all(promesasEliminacionVacunas)
          .then(() => {
            // Paso 2: Eliminar la mascota
            fetch(`${URL_MASCOTAS}/${idMascotaEliminar}`, {
              method: 'DELETE'
            })
            .then(res => res.json())
            .then(mascotaEliminada => {
              resolve(mascotaEliminada); // Resolvemos la promesa con la respuesta de la mascota eliminada
            })
            .catch(error => reject(`Error al eliminar mascota: ${error}`)); // Error al eliminar mascota
          })
          .catch(error => reject(`Error al eliminar vacunas: ${error}`)); // Error al eliminar vacunas
      })
      .catch(error => reject(`Error al obtener las vacunas: ${error}`)); // Error al obtener vacunas
  });

}
export default{
  traerTodas,
  traerUna,
  crear,
  eliminar,
  actualizar,
  eliminarMascotaYVacunas
}