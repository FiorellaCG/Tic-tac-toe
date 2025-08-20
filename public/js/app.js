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
const resetButton = document.getElementById("reset")
const oneVsOneButton = document.getElementById("contraJugador")

//Obteniendo los elementos de los contadores
const contadorX = document.getElementById("contadorX")
const contadorO = document.getElementById("contadorO")
//Variables para el contador
let puntosX = 0
let puntosO = 0
//Variables para el turno
let turno = "X"
let gameOver = false


function movimientos() {
    boxes.forEach((casilla) => {
        casilla.addEventListener("click", () => {
            if (gameOver) return
            if (turno !== "X") return
            if (casilla.textContent !== "") return

            // Juega
            casilla.textContent = "X"

            // ¿Ganó X?
            const ganadorX = checkWinner()
            if (ganadorX) return ganador(ganadorX)
            if (esEmpate()) return empate()

            // Turno de O
            turno = "O"
            setTimeout(() => {
                movCirculo()
                const ganadorO = checkWinner()
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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWinner() {
    for (const [a, b, c] of casillasGanadoras) {
        const valor = boxes[a].textContent;
        if (valor && valor === boxes[b].textContent && valor === boxes[c].textContent) {
            return valor
        }
    }
    return null
}

function esEmpate() {
    return boxes.every(c => c.textContent !== "");
}

function ganador(jugador) {
    gameOver = true;

    if (jugador === "X") {
        puntosX++;
        contadorX.textContent = `X: ${puntosX}`;
    } else if (jugador === "O") {
        puntosO++;
        contadorO.textContent = `O: ${puntosO}`;
    }

    alert(`¡${jugador} gana!`);
}

function empate() {
    gameOver = true
    alert("¡Empate!")
}
resetButton.addEventListener("click", () => {
    
    boxes.forEach(c => c.textContent = "")
    gameOver = false
    turno = "X"
    
})
movimientos()

function actualizarContadores() {
    contadorX.textContent = `X: ${puntosX}`
    contadorO.textContent = `O: ${puntosO}`
}


