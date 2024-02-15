let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let Precio = 0;
let contador = 0;
let isValid = true;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = [];

// Limpia toda la lista de compras incluyendo los campos
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`
    cuerpoTabla.innerHTML = "";
    localStorage.setItem("contadorProductos", contadorProductos);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    txtNombre.focus();
});

function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }
    if (isNaN(txtNumber.value)) {
        return false;
    }
    if (Number(txtNumber.value) <= 0) {
        return false;
    }
    return true;
}

function getPrecio() {
    return parseInt((Math.random() * 90) * 100) / 100;
}

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    txtNumber.value = txtNumber.value.trim();
    txtNombre.value = txtNombre.value.trim();

    if (txtNombre.value.length < 3) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", 'El <strong>Nombre</strong> no es correcto <br/>');
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red thin";
        isValid = false;
    }

    if (!validarCantidad()) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `La <strong>Cantidad </strong> no es correcta </br>`);
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red thin";
        isValid = false;
    }

    if (isValid) {
        contador++;
        precio = getPrecio();
        row = `<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;

        let elemento = `{
            "id": ${contador},
            "nombre": "${txtNombre.value}",
            "cantidad": ${txtNumber.value},
            "precio": ${precio}
        }`;
        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos", JSON.stringify(datos));
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos", contadorProductos);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }
});

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (localStorage.getItem("contadorProductos") != null) {
        contador = parseInt(localStorage.getItem("contadorProductos"));
        totalEnProductos = parseFloat(localStorage.getItem("totalEnProductos"));
        costoTotal = parseFloat(localStorage.getItem("costoTotal"));
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
    }

    if (localStorage.getItem("datos") != null) {
        datos = JSON.parse(localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.cantidad}</td>
                <td>${r.precio}</td>
            </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }
});
