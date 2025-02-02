import {crearInputs} from "./input.js";
export function crearFormulario(modo, entidad, mascotas = null, dato = null) {

  const formulario = document.createElement("FORM");
  formulario.classList.add("shadow-lg", "p-5");

  console.log(" crear formulario:", dato);
  formulario.dataset.modo = modo;// para la delegacion de eventos
  formulario.dataset.entidad = entidad;
  let inputs = crearInputs(modo, entidad, mascotas, dato);
  formulario.innerHTML = inputs;
  formulario.classList.add("form");
  return formulario;
}
