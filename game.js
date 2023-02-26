const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;
let level = 0;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemiesPosition = []; 

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.6;
    }

canvas.setAttribute('width', canvasSize);
canvas.setAttribute('height', canvasSize);

elementsSize = canvasSize / 10; 

startGame();
}

function startGame (){
game.font = elementsSize + 'px Verdana';
game.textAlign = 'end';

const map = maps[level];

if (!map){
  gameWim();
  return;
}

const mapRows = map.trim().split('\n');
const mapRowsCol = mapRows.map(row => row.trim().split(''));
console.log({map, mapRows, mapRowsCol});

enemiesPosition = [];
game.clearRect(0,0,canvasSize, canvasSize);

mapRowsCol.forEach((row, rowI )=> {
    row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX =  elementsSize * (colI + 1);
        const posY =  elementsSize * (rowI + 1);

        if (col == 'O'){
           if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log({playerPosition});
           } 
          } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
          } else if (col == 'X') {
            enemiesPosition.push({
              x: posX,
              y: posY,
            });
          }
        game.fillText(emoji, posX, posY);
    });

});
movePlayer();
}

function movePlayer () {

const giftCollisionX = playerPosition.x.toFixed(12) == giftPosition.x.toFixed(12);    
const giftCollisionY = playerPosition.y.toFixed(12) == giftPosition.y.toFixed(12);
const giftCollision = giftCollisionX && giftCollisionY;

if (giftCollision) {
  levelWim();
}

const enemiesCollision = enemiesPosition.find(enemy => {
  const enemiesCollisionX = enemy.x.toFixed(12) == playerPosition.x.toFixed(12);
  const enemiesCollisionY = enemy.y.toFixed(12) == playerPosition.y.toFixed(12);
  return enemiesCollisionX && enemiesCollisionY;
});

if (enemiesCollision) {
  console.log('Chocaste con un enemigo')
}

game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

}

function levelWim ( ) {
  console.log('subiste')
  level++;
  startGame();
}

function gameWim (){
  console.log('WIM')
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
  }

function moveUp () {
    console.log('up')
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
      } else {
        playerPosition.y -= elementsSize;
        startGame();
      }
    
}

function moveDown () {
    console.log('down')
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
      } else {
        playerPosition.y += elementsSize;
        startGame();
      }
}

function moveLeft () {
    console.log('Left')
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
      } else {
        playerPosition.x -= elementsSize;
        startGame();
      }
}

function moveRight () {
    console.log('Right')
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
      } else {
        playerPosition.x += elementsSize;
        startGame();
      }
}