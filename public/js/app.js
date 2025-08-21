//Obteniendo los elementos del DOM
//Obteniendo los elementos del div 
const box0 = document.getElementById("0")
const box1 = document.getElementById("1")
const box2 = document.getElementById("2")
const box3 = document.getElementById("3")
const box4 = document.getElementById("4")
const box5 = document.getElementById("5")
const box6 = document.getElementById("6")
const box7 = document.getElementById("7")
const box8 = document.getElementById("8")
const boxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8]

//Obteniendo los elementos del botón de reinicio y 1vs1
const reiniciarBtn = document.getElementById("reiniciar")
const oneVsOneButton = document.getElementById("contraJugador") //hacerlo
const botBtn = document.getElementById("contraBot")

//Obteniendo los elementos de los contadores
const contadorX = document.getElementById("contadorX")
const contadorO = document.getElementById("contadorO")

//Variables para el contador
let puntosX = 0
let puntosO = 0
//Variables para el turno
let turno = "X"
let gameOver = false

let modo = 'bot';
oneVsOneButton.onclick = () => { modo = 'pvp'; reiniciarTablero(); };
botBtn.onclick        = () => { modo = 'bot'; reiniciarTablero(); };

// 2) Un único listener por casilla
boxes.forEach(casilla => {
  casilla.onclick = () => {
    if (gameOver || casilla.textContent) return;

    // Siempre escribe el símbolo del turno actual
    casilla.textContent = turno;
    if (finalizarSiCorresponde()) return;

    if (modo === 'pvp') {
      // 1 vs 1: alternar turno y listo
      turno = (turno === 'X') ? 'O' : 'X';
    } else {
      // Bot: juega O automáticamente y vuelve el turno a X
      turno = 'O';
      movCirculo();
      if (!finalizarSiCorresponde()) turno = 'X';
    }
  };
});

// 3) Helpers muy pequeños
function finalizarSiCorresponde() {
  const g = revisarGanador();
  if (g) { ganador(g); return true; }
  if (esEmpate()) { empate(); return true; }
  return false;
}

function reiniciarTablero() {
  boxes.forEach(c => c.textContent = '');
  gameOver = false;
  turno = 'X';
}
reiniciarBtn.onclick = reiniciarTablero;





function movimientos() {
    boxes.forEach((casilla) => {
        casilla.addEventListener("click", () => {
            if (gameOver) return
            if (turno !== "X") return
            if (casilla.textContent !== "") return

            // Juega
            casilla.textContent = "X"

            // ¿Ganó X?
            const ganadorX = revisarGanador()
            if (ganadorX) return ganador(ganadorX)
            if (esEmpate()) return empate()

            // Turno de O
            turno = "O"
            setTimeout(() => {
                movCirculo()
                const ganadorO = revisarGanador()
                if (ganadorO) return ganador(ganadorO)
                if (esEmpate()) return empate()
                turno = "X"
            }, 10)
        });
    });
}

function movCirculo() {
    if (gameOver) return

    const vacias = boxes.filter(c => c.textContent === "")
    if (vacias.length === 0) return

    const i = Math.floor(Math.random() * vacias.length)
    vacias[i].textContent = "O"
}

// Definición de las casillas ganadoras y sus posiciones
const casillasGanadoras = [
    [0, 1, 2], //Fila
    [3, 4, 5], //Fila
    [6, 7, 8], //Fila
    [0, 3, 6], //Columna
    [1, 4, 7], //Columna
    [2, 5, 8], //Columna 
    [0, 4, 8], //Diagonal
    [2, 4, 6]  //Diagonal
]

function revisarGanador() {
    // Recorre cada combinacion ganadora
    for (const [a, b, c] of casillasGanadoras) {
        //Toma el valor (X O)
        const valor = boxes[a].textContent;
        //Validamos, si la casilla no esta vacial y ademas es igual a las otras dos, hay un ganador
        if (valor && valor === boxes[b].textContent && valor === boxes[c].textContent) {
            //Retorna el ganador (X O) si no devuelve null
            return valor
        }
    }
    return null
}

function esEmpate() {
    // Verifica si todas las casillas están llenas, si estan llenas hay un empate
    return boxes.every(c => c.textContent !== "");
}

function ganador(jugador) {
    gameOver = true;

    if (jugador === "X") {
        // Suma un punto al gujador X
        puntosX++;
        contadorX.textContent = `X: ${puntosX}`;
    } else if (jugador === "O") {
        // Sino suma un punto al jugador O
        puntosO++;
        contadorO.textContent = `O: ${puntosO}`;
    }

    //Manda un mensaje al jugador que gano
    alert(`¡${jugador} gana!`);
}

//Marca el juego terminado y muestra el mensaje de empate
function empate() {
    gameOver = true
    alert("¡Empate!")
}
reiniciarBtn.addEventListener("click", () => {
    //Limpia las casillas 
    boxes.forEach(c => c.textContent = "")
    //Vuelve a empezar el juego
    gameOver = false
    //Empezamos con X de nuevo
    turno = "X"
    
})
movimientos()
//Cuando se refresca la pantalla se borra los puntos 
function actualizarContadores() {
    contadorX.textContent = `X: ${puntosX}`
    contadorO.textContent = `O: ${puntosO}`
}


