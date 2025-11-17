let personagemX = 1;
let personagemY = 1;
const tamanhoLabirinto = 10;

// Timer
let tempoRestante = 15;
let timerInterval = null;

// Níveis
const niveis = [
  [
    [0,0,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1],
    [0,0,1,1,1,1,1,0,1,0,1],
    [0,1,0,0,0,0,1,0,1,0,1],
    [0,1,1,1,1,0,1,0,1,0,1],
    [0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,2,1],
    [1,1,1,1,1,1,1,1,1,1,1]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1,1,1]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1,1,1]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1,1,1]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,2,1],
    [1,1,1,1,1,1,1,1,1,1]
  ]
];

let nivelAtual = 0;
let labirinto = niveis[nivelAtual];

function desenharLabirinto() {
    const container = document.getElementById('labirinto');
    container.innerHTML = '';
    
    for (let y = 0; y < tamanhoLabirinto; y++) {
        for (let x = 0; x < tamanhoLabirinto; x++) {
            const cell = document.createElement('div');
            if (labirinto[y][x] === 1) {
                cell.className = 'parede';
            } else if (labirinto[y][x] === 2) {
                cell.className = 'saida';
            } else {
                cell.className = 'caminho';
            }
            if (x === personagemX && y === personagemY) {
                cell.classList.add('personagem');
            }
            container.appendChild(cell);
        }
    }
}

function mover(dx, dy) {
    const novaX = personagemX + dx;
    const novaY = personagemY + dy;
    
    if (novaX >= 0 && novaX < tamanhoLabirinto &&
        novaY >= 0 && novaY < tamanhoLabirinto &&
        labirinto[novaY][novaX] !== 1) {
        
        personagemX = novaX;
        personagemY = novaY;
        
        if (labirinto[novaY][novaX] === 2) {
            clearInterval(timerInterval);
            mostrarTelaVitoria();
        }
        
        desenharLabirinto();
    }
}

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowUp': mover(0, -1); break;
        case 'ArrowDown': mover(0, 1); break;
        case 'ArrowLeft': mover(-1, 0); break;
        case 'ArrowRight': mover(1, 0); break;
    }
});

function iniciarTimer() {
    tempoRestante = 15;
    atualizarTimerDisplay();

    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarTimerDisplay();

        if (tempoRestante <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado!");
            reiniciar();
        }
    }, 1000);
}

function atualizarTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `Tempo restante: ${tempoRestante}s`;
    }
}

function mostrarTelaVitoria() {
    const container = document.getElementById('conteudo-principal');
    container.innerHTML = `
        <h1>🏆 Campeão! 🏆</h1>
        <p>Você completou o Nível ${nivelAtual + 1}!</p>
        <div>
            <button onclick="sair()">Sair</button>
            <button onclick="proximoNivel()">Próximo Nível</button>
        </div>
    `;
}

function sair() {
    window.location.href = '../index.html';
}

function proximoNivel() {
    nivelAtual++;
    if (nivelAtual < niveis.length) {
        labirinto = niveis[nivelAtual];
        personagemX = 1;
        personagemY = 1;
        document.getElementById('conteudo-principal').innerHTML = `
            <h1>Labirinto com Setas</h1>
            <p>Use as setas do teclado para mover o personagem vermelho até a saída verde.</p>
            <div id="timer">Tempo restante: 15s</div>
            <div class="nivel">Nível ${nivelAtual + 1}</div>
            <div id="labirinto"></div>
            <button onclick="reiniciar()">Reiniciar</button>
        `;
        iniciarTimer();
        desenharLabirinto();
    } else {
        alert("Parabéns! Você completou todos os níveis!");
        window.location.href = '../index.html';
    }
}

function reiniciar() {
    clearInterval(timerInterval);
    personagemX = 1;
    personagemY = 1;
    desenharLabirinto();
    iniciarTimer();
}

desenharLabirinto();
iniciarTimer();