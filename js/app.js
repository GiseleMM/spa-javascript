
console.log("Iniciando app:MascotaMia🐶");
import {  crearVistaHome, showPreloader,showErrorPage } from "./views.js";
import { handlerBottonNewClick, handlerTablaClick, handlerNavClick } from "./handlers.js";

showPreloader();


try {
  
  

    document.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);

        if (target.matches("botton[data-entidad]")) handlerBottonNewClick(event);

        if (target.matches("table tr td[data-accion]")) handlerTablaClick(event);

        if (target.matches("header ul li a")) handlerNavClick(event);


    });

    
    crearVistaHome();

} catch (error) {
    console.log(error);

    console.log(error.message);
        showErrorPage("Lo sentimos, el servidor no esta funcionando");

}














