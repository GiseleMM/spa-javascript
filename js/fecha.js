/**
 * 
 * @param {m/d/yyyy} fechaFormatomdyyyy 
 * @returns {mes,dia,anio} | null
 */
export function parsearFechaMDY(fechaFormatomdyyyy) {
    console.log("parse", fechaFormatomdyyyy)
    if (fechaFormatomdyyyy == null) return null;

    let array_fecha = fechaFormatomdyyyy.split("/");/// formato de fecha m/d/yyyy
    console.log(array_fecha);
    let mes = array_fecha[0];
    let dia = array_fecha[1];
    let anio = array_fecha[2];
    console.log({ mes, dia, anio });
    return { mes, dia, anio };
}
/**
 * 
 * @param {m/d/yyyy} fecha 
 * @returns obj Date
 */
export function crearDateConFechaMDY(fecha)
{
        if (fecha == null) return null;
    
        let {mes,dia,anio}=parsearFechaMDY(fecha);

        return new Date(anio, mes-1 , dia);
    
    }
    /**
     * 
     * @param {mes comenzando de 0} mes 
     * @param {anio} anio 
     * @param {dia} dia 
     * @returns  {yyyy-MM-dd}
     */
export function parsearFechaHTML(mes,anio,dia)
{
      // date html  yyyy-MM-dd
      return `${anio}-${mes.length == 1 ? "0" + mes : mes}-${dia.length == 1 ? "0" + dia : dia}`;
}
// de 2024-04-18 a=>m/d/yyyy
/**
 * 
 * @param {yyyy-MM-dd} dateHTML 
 * @returns {M/D/YYYY}
 */
export function convertirMDYYYY(dateHTML)
{
    let array=dateHTML.split("-");
    let anio=array[0];
    let mes=array[1];
    let dia=array[2];
    return `${mes}/${dia}/${anio}`;

}
//convierte Fri Feb 07 2025 00:00:00 GMT-0300 (hora estándar de Argentina) a ---->>>  d/m/y
/**
 * 
 * @param {Fri Feb 07 2025 00:00:00 GMT-0300 hora estándar de Argentina} DateString 
 * @returns {dia/mes/año}
 */
export function convertirDate(DateString)
{
    let fecha = new Date(DateString);//elemento.proxima 
    const mes = fecha.getMonth();// mes sumar 1 por q el obj date empieza a contar desde 0 los meses
    const dia = fecha.getDate();
    const anio = fecha.getFullYear();

    return `${dia}/${mes+1}/${anio}`;//
}

export function esValidaFechaMDYYYY(fechaFormatomdyyyy) {
    let fechaValida = false;
    if (fechaFormatomdyyyy) {

        let array = fechaFormatomdyyyy.split("/");
        if (array && array.length == 3) {


            let isNanAlguna=array.some(f => isNaN(Number(f)));
            if(!isNanAlguna)fechaValida=true;

        }

    }
    return fechaValida;

}
