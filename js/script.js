const res = document.getElementById('result');
const cuentaAtrasDiv = document.getElementById('countdown');
const userInput = document.getElementById('userInput'); // Obtener la referencia al input

let numeroDelUsuario;

function iniciarPromesaMaquina() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const numeroMaquina = Math.floor(Math.random() * 3) + 1;
            console.log('Maquina devuelve 5seg:', numeroMaquina);
            resolve(numeroMaquina);
        }, 5000);
    });
}

const promesaMaquina = iniciarPromesaMaquina();

function iniciarCuentaAtrasVisual() {
    let tiempoRestante = 5;
    cuentaAtrasDiv.textContent = `Cuenta atras: ${tiempoRestante.toFixed(2)} `; // Mostrar con 2 decimales inicialmente
    const intervaloCuentaAtras = setInterval(() => {
        tiempoRestante -= 0.2; // Decrementar en 0.2 segundos
        if (tiempoRestante <= 0) {
            clearInterval(intervaloCuentaAtras);
            cuentaAtrasDiv.textContent = 'La máquina ha terminado de pensar.';
        } else {
            cuentaAtrasDiv.textContent = `Cuenta atras: ${tiempoRestante.toFixed(2)} `; // Mostrar con 2 decimales
        }
    }, 200); // Intervalo de 200 milisegundos
    return intervaloCuentaAtras;
}

const intervaloCuenta = iniciarCuentaAtrasVisual();

// Verificar si res existe antes de usarlo
if (res) {
    promesaMaquina.then((numeroMaquina) => {
        clearInterval(intervaloCuenta);
        cuentaAtrasDiv.textContent = '';

        if (numeroDelUsuario !== undefined) {
            if (numeroMaquina === numeroDelUsuario) {
                res.innerHTML = `<h3>¡Has salvado el mundo!</h3>
                    <p>Tu numero <b>${numeroDelUsuario}</b> es el mismo que el numero: ${numeroMaquina}</p>`;
            } else {
                if (isNaN(numeroDelUsuario)) {
                    res.innerHTML=`<p>Debe introducir un numero entero </p>`;
                }else{
                res.innerHTML = `<p>¡La bomba ha estallado!</p>
                    <p> Tu numero <b>${numeroDelUsuario}</b> es diferente al numero <b>${numeroMaquina}</b></p>`;}
            }
        } else {
            res.innerHTML = `<p>La máquina devolvió: ${numeroMaquina}. Introduce un número para ver si coincides.</p>`;
        }
    });

    // Listener para la entrada del usuario SOLO cuando se presiona Enter
    if (userInput) {
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                numeroDelUsuario = parseInt(userInput.value);
                console.log('Usuario introduce (dentro del Enter):', numeroDelUsuario);
                
            }
        });
    } else {
        console.error("El elemento con id 'userInput' no existe.");
    }

    // En otro lugar de tu código (para ver el valor en otro momento)
    console.log('Valor de numeroDelUsuario en otro momento:', numeroDelUsuario);
} else {
    console.error("El elemento con id 'result' no existe.");
}

document.getElementById("restart").addEventListener("click", () => {
    location.reload();
    userInput.value='';
});