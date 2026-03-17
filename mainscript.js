/*
Jogo da cobrinha - aula dia 17/03/2026 - programação de aplicativos mobile
Site em html para o jogo da cobrinha modelo NOKIA
*/

// Seleciona o elemento canva e define o contexto 2d

function changeDirection(event) { // função de movimento
    const key = event.keyCode;

    if ((key === 65 || key === 37) && direction !== "RIGHT") direction = "LEFT";
    else if ((key === 87 || key === 38) && direction !== "DOWN") direction = "UP";
    else if ((key === 68 || key === 39) && direction !== "LEFT") direction = "RIGHT";
    else if ((key === 83 || key === 40) && direction !== "UP") direction = "DOWN";
}

function generateFood() {// Função de gerar comida
    return {
        x:Math.floor(Math.random() * canvasSize) * box,
        y:Math.floor(Math.random() * canvasSize) * box
    }
}

// Função inicial do jogo
function draw() {
    // Limpar o canva:
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height)

    // Desenhar a cobra:
    ctx.fillStyle = "green";
    for(let i=0; i < snake.length; i++){
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

	// Desenha comida
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, box, box);
	
	// Movimenta a cobra
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(direction === "LEFT") snakeX -= box;
	if(direction === "RIGHT") snakeX += box;
	if(direction === "UP") snakeY -= box;
	if(direction === "DOWN") snakeY += box;

    // verifica se a cobra comeu a comida
    if(snakeX === food.x && snakeY === food.y){
        food = generateFood(); // gera a comida
        score += 10; //aumenta a pontuação
    } else {
        snake.pop(); // remove a última parte da cobra se não comer
    }

    // adiciona nova cabeça
    let newHead = { x:snakeX, y:snakeY};

    // verifica colisões
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || colision(newHead,snake)) {
        alert(`Game Over, seu merda! Sua pontuação de bosta foi ${score}`)
        draw
        document.location.reload()
    }

    snake.unshift(newHead); // adiciona a nova cabeça

    // Exibe pontuação
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score:" +score, 10, 20)

} // fecha a função desenho

function colision(head, array){
    for (let i = 0; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

const canvas = document.getElementById("gamecanvas"); 
const ctx = canvas.getContext("2d");

var direcao = [
    'RIGHT',
    'LEFT',
    'UP',
    'DOWN'
]

let random = direcao[Math.floor(Math.random() * direcao.length)]
// Definições iniciais do jogo
const box = 20; // Tamanho de quadros do jogo
const canvasSize = 20; // Quantidade de quadros na tela
let snake = [{x: 10 * box, y: 10 * box}]; // Posição inicial da cobra
let direction = random // Direção de início
let food = generateFood();
let score = 0;


// Captura de elementos de tela
document.addEventListener("keydown", changeDirection);

// define a velocidade do jogo
setInterval(draw, 50);


