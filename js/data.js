import Mascotas from "./mascotas.js";
import Vacunas from "./vacunas.js";

const mascotas=async()=>await Mascotas.traerTodas();
const vacunas=async()=>await Vacunas.traerTodas();
export default{
mascotas,vacunas
}
