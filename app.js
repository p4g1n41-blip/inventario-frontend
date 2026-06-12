const API_URL = "https://inventario-backend-l6t0.onrender.com/productos";

// Función para consultar los datos guardados en MongoDB Atlas
async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    const datos = await res.json();

    const tabla = document.getElementById("tabla");
    if (!tabla) return;

    tabla.innerHTML = "";

    datos.forEach(prod => {
      tabla.innerHTML += `
        <tr>
          <td>${prod.nombre}</td>
          <td>$${prod.precio}</td>
          <td>${prod.existencia} pzas</td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Error al traer datos:", err);
  }
}

// Función para enviar un nuevo registro a MongoDB
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoObj = {
      nombre: document.getElementById("nombre").value,
      precio: Number(document.getElementById("precio").value),
      existencia: Number(document.getElementById("existencia").value)
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoObj)
      });

      if (res.ok) {
        alert("¡Guardado con éxito en MongoDB Atlas!");
        form.reset();
        obtenerProductos(); // recarga tabla
      }

    } catch (err) {
      console.error("Error al enviar datos:", err);
    }
  });

  // Cargar datos al iniciar
  obtenerProductos();
});