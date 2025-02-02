
export function crearH2(subtitulo) {
  const h2 = document.createElement("H2");
  if (subtitulo) h2.innerHTML = subtitulo;
  h2.classList.add("text-center", "text-light");

  return h2;
}
export function limpiarContenedor(padre) {
  while (padre && padre.firstChild) {
    padre.removeChild(padre.firstChild);
  }
}


export function crearPreloader() {
  const div = document.createElement("DIV");
  div.classList.add("p-5", "m-5", "d-flex", "justify-content-center");
  div.style.height = "60vh";

  div.innerHTML = `<img src="./assets/ripples.svg" class="rounded mx-auto d-block" alt="preloader"> `;
  return div;
}
export function crearBotonNew(msg) {
  const botton = document.createElement("BOTTON");
  botton.innerHTML = msg;
  botton.classList.add("btn", "btn-outline-light", "m-2");
  botton.setAttribute("type", "button");
  return botton;

}


export function crearIconoWarning() {
  //<i class="bi bi-exclamation-triangle"></i>
  let icono = document.createElement("I");
  icono.classList.add("bi", "bi-exclamation-triangle");
  return icono

}