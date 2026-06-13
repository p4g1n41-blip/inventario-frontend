const URL_API = 'https://inventario-backend-l6t0.onrender.com/api/productos';

document.addEventListener('DOMContentLoaded', listarProductos);

document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            existencia: document.getElementById('existencia').value
        })
    });
    document.getElementById('formProducto').reset();
    listarProductos();
});

async function listarProductos() {
    const res = await fetch(URL_API);
    const datos = await res.json();
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    datos.forEach(p => {
        tabla.innerHTML += `<tr>
            <td>${p.nombre}</td><td>$${p.precio}</td><td>${p.existencia}</td>
            <td><button onclick="eliminarProducto('${p._id}')">Eliminar</button></td>
        </tr>`;
    });
}

async function eliminarProducto(id) {
    await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
    listarProductos();
}