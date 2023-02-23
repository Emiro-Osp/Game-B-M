const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize (){
    if (window.innerHeight > window.innerWidth){
        canvasSize = innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

canvas.setAttribute('width', canvasSize);
canvas.setAttribute('height', canvasSize);

elementsSize = canvasSize / 10; 

startGame();
}

function startGame (){

// console.log({canvasSize, elementsSize});

game.font = elementsSize + 'px Verdana';
game.textAlign = 'end';


const map = maps[1];
const mapRows = map.trim().split('\n');
const mapRowsCol = mapRows.map(row => row.trim().split(''));
console.log({map, mapRows, mapRowsCol});

mapRowsCol.forEach((row, rowI )=> {
    row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX =  elementsSize * (colI + 1);
        const posY =  elementsSize * (rowI + 1);
        game.fillText(emoji, posY, posX);
    });
});

// for (let row = 1; row <= 10; row++) {
//   for (let col = 1; col <= 10; col++) {
//     game.fillText(emojis[mapRowsCol[row -1][col -1]], elementsSize * row, elementsSize * col);
//         }
//     }
}

window.addEventListener("keydown", event => console.log(event.key));
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLewft);
btnRight.addEventListener("click", moveRight);

function moveUp () {
    console.log('up')
}

function moveDown () {
    console.log('down')
}

function moveLewft () {
    console.log('Left')
}

function moveRight () {
    console.log('Right')
}