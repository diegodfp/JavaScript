import { controlador } from "./../controllers/controlador.js";
import { get } from "./get.js"; // Importa la función get

const formu = document.querySelector("form");

formu.addEventListener("click", (e) => {
  e.preventDefault();

  controlador(formu, e, "skills");

  // Asegúrate de incluir la lógica necesaria para mostrar datos actuales aquí
  const listaSkills = document.getElementById("listaSkills");
  mostrarDatosActuales(listaSkills);

  e.stopPropagation();
});

// Función para mostrar datos actuales
function mostrarDatosActuales(listaSkills) {
  const URL = "http://localhost:3000/skills";

  // Realiza una solicitud GET para obtener los datos actuales
  get(URL)
    .then((data) => {
      // Llena la lista con los datos actuales
      data.forEach((skill) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${skill.id}, Nombre: ${skill.nombre}`;
        listaSkills.appendChild(listItem);
      });
    });
}