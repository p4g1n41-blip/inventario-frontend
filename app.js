const URL_API = 'https://inventario-backend-l6t0.onrender.com/api/productos';

// 1. LEER (Listar al cargar)
document.addEventListener('DOMContentLoaded', listarProductos);

// 2. CREAR (Formulario)
document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        existencia: document.getElementById('existencia').value
    };

    await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    });
    
    document.getElementById('formProducto').reset();
    listarProductos();
});

// Función para listar
async function listarProductos() {
    try {
        const res = await fetch(URL_API);
        const datos = await res.json();
        const tabla = document.getElementById('tabla');
        tabla.innerHTML = '';

        datos.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>$${p.precio}</td>
                    <td>${p.existencia}</td>
                    <td>
                        <button onclick="eliminarProducto('${p._id}')" style="background:red; color:white; border:none; padding:5px; cursor:pointer;">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// 3. ELIMINAR
async function eliminarProducto(id) {
    if(confirm('¿Seguro que quieres borrar este artículo?')) {
        await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
        listarProductos();
    }
}