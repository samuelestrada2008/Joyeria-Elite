/*  PRODUCTOS */
const productos = [
    {nombre:"Collar Dolar", precio:10000, cat:"collar", img:"img/collardolar.jpeg"},
    {nombre:"Collar Pato Donald", precio:15000, cat:"collar", img:"img/patodonal.jpeg"},
    {nombre:"Collar MonkeyMoney", precio:12000, cat:"collar", img:"img/monodinero.jpeg"},

    {nombre:"Manilla Virgen Guadalupe Roja", precio:8000, cat:"manilla", img:"img/guadalupe.jpeg"},
    {nombre:"Manilla Saco De Dinero", precio:9000, cat:"manilla", img:"img/sacodin.jpeg"},
    {nombre:"Manilla Virgen Guadalupe Negra", precio:9500, cat:"manilla", img:"img/guadalupenegra.jpeg"},

    {nombre:"Anillo plata", precio:12000, cat:"anillo", img:"img/anillo.jpg"},
    {nombre:"Anillo oro", precio:20000, cat:"anillo", img:"img/anillo2.jpg"},
    {nombre:"Anillo elegante", precio:18000, cat:"anillo", img:"img/anillo3.jpg"}
];

/*  CARRITO */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*  CARGAR PRODUCTOS */
function cargarProductos() {
    let cont = document.getElementById("productos");
    cont.innerHTML = "";

    productos.forEach(p => {
        cont.innerHTML += `
        <div class="card" data-cat="${p.cat}">
            <img src="${p.img}" onclick="abrirModal('${p.img}')">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <input type="number" value="1" min="1">
            <button onclick='agregar(${JSON.stringify(p)}, this)'>Agregar</button>
        </div>
        `;
    });
}

/* ➕ AGREGAR */
function agregar(prod, btn) {
    let cantidad = parseInt(btn.parentElement.querySelector("input").value);

    carrito.push({...prod, cantidad});
    guardar();
    renderCarrito();
}

/* 🛒 MOSTRAR */
function renderCarrito() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((p, i) => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        lista.innerHTML += `
        <li>
            ${p.nombre} x 
            <input type="number" value="${p.cantidad}" min="1" onchange="cambiar(${i}, this.value)">
            = $${subtotal}
            <button onclick="eliminar(${i})">❌</button>
        </li>`;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = carrito.length;
}

/* 🔄 CAMBIAR */
function cambiar(i, cantidad) {
    carrito[i].cantidad = parseInt(cantidad);
    guardar();
    renderCarrito();
}

/* ❌ ELIMINAR */
function eliminar(i) {
    carrito.splice(i, 1);
    guardar();
    renderCarrito();
}

/* 💾 GUARDAR */
function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* 🧹 VACIAR */
function vaciar() {
    carrito = [];
    guardar();
    renderCarrito();
}

/* 🔍 FILTRO */
function filtrar(cat) {
    let cards = document.querySelectorAll(".card");

    cards.forEach(c => {
        if (cat === "todos" || c.dataset.cat === cat) {
            c.style.display = "flex";
        } else {
            c.style.display = "none";
        }
    });
}

/* 💬 WHATSAPP */
function comprar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let numero = "573234350545"; // 🔴 CAMBIA ESTO

    let mensaje = "HOLAA me gustaria comprrar los siguientes productos";
    let total = 0;

    carrito.forEach(p => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        mensaje += `• ${p.nombre} x${p.cantidad} = $${subtotal} %0A`;
    });

    mensaje += `%0A/ *Total:* $${total}`;

    let url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
}

/* 🔍 MODAL */
function abrirModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("imgGrande").src = src;
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

/* 🚀 INIT */
cargarProductos();
renderCarrito();
function irAlCarrito() {
    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });
}