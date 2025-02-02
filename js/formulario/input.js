import { MASCOTAS, MODO_DELETE, SEXO_F, SEXO_M, MODO_EDIT } from "../config.js";
export function crearInputText(id, placeholder, value, modo, readonly = false, maxlength = 30) {
  return `
<div class="form-floating mb-3">
<input type="text" 
class="form-control" 
id="${id}"
value="${value == null ? "" : value}"
${modo === MODO_DELETE ? "readonly" : ""}
maxlength="${maxlength}" 
${readonly === true ? "readonly" : ""}
>
<label for="${id}">${placeholder}</label>
</div>`;

}
export function crearInputFecha(id, placeholder, value, modo, required = true) {
  return `
    <div class="form-floating mb-3">
      <input type="date" ${required?"required":""} class="form-control" id="${id}" placeholder="${placeholder}" value="${value == null ? "" : value}" ${modo == MODO_DELETE ? "readonly" : ""}
      maxlength="25"
      >
      <label for="${id}">${placeholder}</label>
    </div>`;
}
export function crearInputSelect(id, placeholder, value, modo, mascotas) {
  let selectHTML = "";
  if (mascotas != null) {
    selectHTML += `<div class="form-floating">
          <select class="form-select form-select-sm"  name="${id}" id="${id}" aria-label="Small  select example"  ${modo == MODO_DELETE ? "disabled" : ""} required>`;
    selectHTML += ``
    mascotas.forEach(element => {
      selectHTML += `<option value="${element.id}" ${value != null ? value == element.id ? "selected" : "" : ""}>${element.nombre}</option>`

    });
    selectHTML += `</select>
          <label for="${id}">${placeholder}</label>
          </div>`;
  }
  return selectHTML;
}
export function crearInputsRadioSexo(idF, idM, value, modo) {
  let radio = "";
  radio = `<div class="form-check">
  <input 
  class="form-check-input"
  type="radio"
  value="${SEXO_F}"
  name="sexo"
  required 
  id="${idF}"
  ${value != null ? value == SEXO_F ? "checked" : "" : ""}
  ${modo == MODO_DELETE ? "disabled" : ""}>
  <label class="form-check-label text-light" for="${idF}">
  ${SEXO_F}
  </label>
</div>

<div class="form-check">
<input
class="form-check-input"
value="${SEXO_M}"
 type="radio"
 name="sexo"
 id="${idM}"
 ${value != null ? value == SEXO_M ? "checked" : "" : ""}
 ${modo == MODO_DELETE ? "disabled" : ""}>
 <label class="form-check-label text-light" for="${idM}">
${SEXO_M}
 </label>
</div>`;
  return radio;
}
export function crearBotonSubmit(modo) {
  return `<div class="d-flex justify-content-center"> 
   <button type="submit" class="btn btn-outline-${modo == MODO_DELETE ? "dark" : "light"} w-50 m-3">${modo.toUpperCase()}</button> </div>`;
}

export function crearInputsVacunas(modo, mascotas, dato = null) {
  /*
  "id": 4,
      "nombre": "Solanum lycopersicum L. var. cerasiforme (Dunal) Spooner, G.J. Anderson & R.K. Jansen",
      "fecha": "4/22/2024",
      "dosis": 22,
      "proxima": "2/7/2025",
      "matriculaVeterinario": "983-91-0378 ",
      "idMascota": 4
    }*/
  let inputs = "";
  if (modo == MODO_EDIT || modo == MODO_DELETE) {
    inputs += crearInputText("floatingId", "ID", dato.id, modo, true);
  }
  inputs += crearInputText("floatingNombre", "Vacuna", dato ? dato.nombre : null, modo);
  inputs += crearInputFecha("floatingFecha", "Fecha", dato != null ? dato.fecha : null, modo);
  inputs += crearInputText("floatingDosis", "Dosis", dato ? dato.dosis : null, modo);
  inputs += crearInputFecha("floatingProxima", "Proxima fecha", dato != null ? dato.proxima : null, modo, false);
  inputs += crearInputText("floatingMatricula", "Matrícula", dato != null ? dato.matriculaVeterinario : null, modo);

  inputs += crearInputSelect("floatingSelect", "Seleccione mascota", dato != null ? dato.idMascota : null, modo, mascotas);

  inputs += crearBotonSubmit(modo);

  return inputs;

}

export function crearInputsMascota(modo, dato = null) {
  // "id": 1,
  //   "nombre": "sas",
  //   "especie": "Bustard, denham's",
  //   "fechaNacimiento": "12/8/2024",
  //   "sexo": "F",
  //   "idDuenio": 1
  let inputs = "";
  if (modo == MODO_EDIT || modo == MODO_DELETE) {
    inputs += crearInputText("floatingId", "ID", dato.id, modo, true);
  }
  inputs += crearInputText("floatingNombre", "Nombre", dato?.nombre, modo);
  console.log(inputs);
  inputs += crearInputText("floatingEspecie", "Especie ", dato?.especie, modo);
  inputs += crearInputFecha("floatingFechaNacimiento", "Fecha de nacimiento", dato?.fechaNacimiento, modo);
  inputs += crearInputsRadioSexo("flexRadioSexoF", "flexRadioSexoM", dato?.sexo, modo);


  inputs += crearBotonSubmit(modo);

  return inputs;

}


export function crearInputs(modo, entidad, mascotas = null, dato = null) {

  if (entidad == MASCOTAS) return crearInputsMascota(modo, dato);
  return crearInputsVacunas(modo, mascotas, dato);

}
// Limpiar los valores de todos los inputs, select y textarea en el formulario
export function miResetForm(target) {
  const inputs = target.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (!(input.type == "text" && input.id == "floatingId")) {

      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;  // Limpiar checkboxes o radio buttons
      } else {
        input.value = '';  // Limpiar los valores de los inputs
      }
    }
  });
}