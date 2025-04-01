const res = document.getElementById('result');
const cuentaAtrasDiv = document.getElementById('countdown');

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

        const userInput = document.getElementById('userInput');
        if (userInput) {
            numeroDelUsuario = parseInt(userInput.value);
        }

        if (numeroDelUsuario !== undefined) {
            if (numeroMaquina === numeroDelUsuario) {
                res.innerHTML = `<h3>¡Has salvado el mundo!</h3>
                    <p>Tu numero <b>${numeroMaquina}</b> es el mismo que el numero: ${numeroDelUsuario}</p>`;
            } else {
                if(numeroDelUsuario!==NaN){numeroDelUsuario=0;}
                res.innerHTML = `<p>¡La bomba ha estallado!</p>
                    <p> Tu numero <b>${numeroDelUsuario}</b> es difernte al numero  <b>${numeroMaquina}</b></p>`;
            }
        } else {
            res.innerHTML = `<p>La máquina devolvió: ${numeroMaquina}. Introduce un número para ver si coincides.</p>`;
        }
    });

    // Listener para la entrada del usuario (opcional)
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                numeroDelUsuario = parseInt(userInput.value);
                console.log('Usuario introduce:', numeroDelUsuario);
            }
        });
    }
} else {
    console.error("El elemento con id 'resultado' no existe.");
}


document.getElementById("restart").addEventListener("click" , () => {
    location.reload();
})