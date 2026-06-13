const URL_API = 'https://inventario-backend-l6t0.onrender.com/api/productos';
let editandoId = null; 

document.addEventListener('DOMContentLoaded', listarProductos);

document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        existencia: document.getElementById('existencia').value
    };

    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId ? `${URL_API}/${editandoId}` : URL_API;

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });

    editandoId = null;
    document.getElementById('formProducto').reset();
    listarProductos();
});

async function listarProductos() {
    const res = await fetch(URL_API);
    const datos = await res.json();
    const tbody = document.querySelector('#tabla tbody');
    tbody.innerHTML = '';
    datos.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.nombre}</td><td>$${p.precio}</td><td>${p.existencia}</td>
            <td>
                <button onclick="prepararEdicion('${p._id}', '${p.nombre}', ${p.precio}, ${p.existencia})">Editar</button>
                <button onclick="eliminarProducto('${p._id}')" style="background:red; color:white;">Eliminar</button>
            </td>
        </tr>`;
    });
}

function prepararEdicion(id, nombre, precio, existencia) {
    editandoId = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('existencia').value = existencia;
}

async function eliminarProducto(id) {
    await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
    listarProductos();
}