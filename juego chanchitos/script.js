// Configuración del juego
const ORDEN_GANADOR = ['ladrillo', 'puerta', 'techo', 'cama'];
let secuenciaUsuario = [];

// Elementos del DOM
const nodos = document.querySelectorAll('.nodo');
const placeholders = document.querySelectorAll('.placeholder-nodo');
const btnReiniciar = document.getElementById('btn-reiniciar');
const pantallaGanar = document.getElementById('resultado-ganar');
const pantallaPerder = document.getElementById('resultado-perder');

// Manejo de clics en los nodos
nodos.forEach(nodo => {
    nodo.addEventListener('click', () => {
        const idElemento = nodo.getAttribute('data-id');
        const imgSrc = nodo.querySelector('img').src;

        if (secuenciaUsuario.length < 4) {
            // Guardar en la secuencia
            secuenciaUsuario.push(idElemento);
            nodo.classList.add('seleccionado');
            btnReiniciar.classList.remove('oculto');

            // Dibujar la imagen en el casillero correspondiente
            const posicionActual = secuenciaUsuario.length - 1;
            placeholders[posicionActual].innerHTML = `<img src="${imgSrc}" alt="${idElemento}">`;

            // Verificar si completó los 4 nodos
            if (secuenciaUsuario.length === 4) {
                evaluarResultado();
            }
        }
    });
});

// Evaluar si el orden es correcto
function evaluarResultado() {
    // Bloquear más interacciones en el tablero
    nodos.forEach(n => n.style.pointerEvents = 'none');

    // Comparamos los arrays uno a uno
    const gano = secuenciaUsuario.every((val, index) => val === ORDEN_GANADOR[index]);

    if (gano) {
        pantallaGanar.classList.remove('oculto');
    } else {
        pantallaPerder.classList.remove('oculto');
    }
}

// Botón de Reiniciar
btnReiniciar.addEventListener('click', reiniciarJuego);

function reiniciarJuego() {
    secuenciaUsuario = [];
    
    // Limpiar casilleros de arriba
    placeholders.forEach((p, index) => {
        p.innerHTML = (index + 1).toString();
    });

    // Resetear tablero inferior
    nodos.forEach(nodo => {
        nodo.classList.remove('seleccionado');
        nodo.style.pointerEvents = 'auto';
    });

    // Ocultar respuestas y el propio botón
    btnReiniciar.classList.add('oculto');
    pantallaGanar.classList.add('oculto');
    pantallaPerder.classList.add('oculto');
}