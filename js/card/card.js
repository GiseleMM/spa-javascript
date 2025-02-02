import { convertirDate } from "../fecha.js";

export function crearCards(datos) {

    const divContendor = document.createElement("DIV");
    divContendor.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");
    datos.forEach(element => {
  
       let fechaFormat= convertirDate(element.proxima);
       console.log(element);
  
      divContendor.innerHTML += ` <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${element.mascota}</h5>
          <p class="card-text">
          Proxima vacuna 💉: 
          </p>
          <ul>
          <li>${fechaFormat} </li>
          <li> ${element.nombre} </li>
          </ul>
        </div>
      </div>
    </div>`
    });
    return divContendor;
  }