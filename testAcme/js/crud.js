document.addEventListener('DOMContentLoaded', function () {
    const signinButton = document.getElementById('signinButton');


    signinButton.addEventListener('click', function (e) {
        e.preventDefault();

        const tipo = document.getElementById('tipo').value;
        const id = document.getElementById('id').value;
        const contraseña = document.getElementById('contraseña').value;
        autenticarUsuarioEnServidor(tipo, id, contraseña);

    })
});


function autenticarUsuarioEnServidor(tipo, id, contraseña) {
    const url = `http://localhost:4001/usuarios`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(users => {

            foundUser = users.find(user => user.tipoId === tipo && user.id === id && user.pass === contraseña);

            if (foundUser) {
                console.log('Usuario autenticado');
                const userInfoString = JSON.stringify(foundUser);
                localStorage.setItem('usuarioAutenticado', userInfoString)
                const usuarioAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticado'));
                console.log(usuarioAutenticado.tipoId)
                alert("bienvenido")
                if (usuarioAutenticado.tipoId == "2") {
                    mostrarVentanaFuncionario()
                } else {
                    mostrarVentanaCliente()
                }


            } else {
                alert('Credenciales erroneas, intente nuevamente');
            }
        })
        .catch(error => console.error('Error!', error));
}

function mostrarVentanaFuncionario() {
    const formularioContainer = document.getElementById("form-container");
    const templateFuncionario = document.getElementById("templateFuncionario");
    formularioContainer.style.display = "none";
    templateFuncionario.style.display = " block"


}


/////////  buscar Cliente ///// 


document.addEventListener('DOMContentLoaded', function () {
    const signinButton = document.getElementById('buscarClienteButton');


    signinButton.addEventListener('click', function (e) {
        e.preventDefault();


        const id = document.getElementById('idCliente').value;;
        autenticarCliente(id);
        console.log(id)
    })
});


function autenticarCliente(id) {
    const url = `http://localhost:4001/usuarios`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(users => {

            foundUser = users.find(user => user.tipoId === "3" && user.id === id);

            if (foundUser) {
                console.log('Cliente autenticado');
                const userInfoString = JSON.stringify(foundUser);
                localStorage.setItem('clienteEncontrado', userInfoString)
                const clienteEncontrado = JSON.parse(localStorage.getItem('clienteEncontrado'));
                alert("cliente encontrado")
                mostrarComprasCliente(id, clienteEncontrado)
            } else {
                alert('quedo algo mal, intente nuevamente');
            }
        })
        .catch(error => console.error('Error!', error));
}

function mostrarComprasCliente(id, clienteEncontrado) {
    const nombre = document.getElementById("nombreCliente")
    const cedula = document.getElementById("cedulaCliente")
    const listaCompras = document.getElementById("listaCompras")
    nombre.textContent = clienteEncontrado.nombre;
    cedula.textContent = clienteEncontrado.id
    const numerodeCompras = document.getElementById("numerodeCompras")
    const cuantasFaltan = document.getElementById("cuantasFaltan")
    const botonregistrarCompra = document.getElementById("botonregistrarCompra")
    const botonregistrarBono = document.getElementById("botonregistrarBono")
    let contador = 0
    let faltan = 0
    const url = `http://localhost:4001/registros`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(registros => {

            foundUser = registros.find(registro => registro.usuarioId === id);
            if (foundUser) {
                foundUser.compras.forEach((compras) => {
                    contador  = contador + 1
                    const listItem = document.createElement("li");
                    nombreProducto = saberNombreProducto(compras.perfumeId)
                    listItem.textContent = ` Fecha de Compra ${compras.fecha}, Nombre del Producto: ${nombreProducto}`;
                    listaCompras.appendChild(listItem);
                    
                });
                alert("las compras del usuario han sido encontradas")
                console.log(foundUser.compras)
                numerodeCompras.textContent =` El cliente ha realizado   ${contador } compras`
                faltan = cuanFaltan(contador)
                cuantasFaltan.textContent = faltan
                botonregistrarCompra.style.display = " block"
                botonregistrarBono.style.display = " block"
            }   
        })
}


function agregarbono(){}

function cuanFaltan(contador){
    if (contador >= 10){
        return "y no falta ninguna compra para reclamar su bono"
    } else {
        return ` y aun le faltan  ${10 - contador } para reclamar su bono` 
    }
}



///

function saberNombreProducto(value) {
    switch (value) {
        case "1":
            return "Perfume A"
        case "2":
            return "Perfume B"
        case "3":
            return "Perfume C"
        case "4":
            return "Perfume D"
        case "5":
            return "Perfume E"
        case "6":
            return "Perfume F"
        case "7":
            return "Perfume G"
        case "8":
            return "Perfume H"
        case "9":
            return "Perfume I"
        case "10":
            return "Perfume J"




    }
}


 //// funcion registrar compra