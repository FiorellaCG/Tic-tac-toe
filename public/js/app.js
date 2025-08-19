const box0 = document.getElementById("0");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");
const boxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8];

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", reiniciarJuego);

let turno = "X";
let gameOver = false;

function movCirculo() {
    if (gameOver) return;

    const vacias = boxes.filter(c => c.textContent === "");
    if (vacias.length === 0) return;

    const i = Math.floor(Math.random() * vacias.length);
    vacias[i].textContent = "O";
}

function movimientos() {
    boxes.forEach((casilla) => {
        casilla.addEventListener("click", () => {
            if (gameOver) return;
            if (turno !== "X") return;
            if (casilla.textContent !== "") return;

            // Juega X (humano)
            casilla.textContent = "X";

            // ¿Ganó X?
            const w1 = checkWinner();
            if (w1) return ganador(w1);
            if (esEmpate()) return empate();

            // Turno de O (CPU)
            turno = "O";
            setTimeout(() => {
                movCirculo();
                const w2 = checkWinner();
                if (w2) return ganador(w2);
                if (esEmpate()) return empate();
                turno = "X";
            }, 10); 
        });
    });
}

const WIN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]           
];

function checkWinner() {
    for (const [a, b, c] of WIN) {
        const valor = boxes[a].textContent;
        if (valor && valor === boxes[b].textContent && valor === boxes[c].textContent) {
            return valor; 
        }
    }
    return null;
}

function esEmpate() {
    return boxes.every(c => c.textContent !== "");
}

function ganador(jugador) {
    gameOver = true;
    alert(`¡${jugador} gana!`);
}

function empate() {
    gameOver = true;
    alert("¡Empate!");
}

function reiniciarJuego(){
    boxes.forEach(c => c.textContent = "");
    gameOver = false;
    turno = "X";
}
movimientos();


