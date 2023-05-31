console.log("Funcionando");

const board = document.getElementById("tabuleiro");
const cells = board.getElementsByTagName("td");
const lines =  board.getElementsByTagName("tr").length;
const cols = cells.length / lines;
//const shipSize = 3;
const shipSizes = [5,3,3,2,1];
const shipLocations = createShip();
let hitTarget = 0;

for (let i=0; i < cells.length ; i++) {
  cells[i].addEventListener('click',cellClick)
  console.log(i);
}

function generateRandom(max) {
  random = Math.floor(Math.random()*max);

  console.log(max);
  return random;
}

function createShip() {
  ships = [];

  for (i = 0; i<shipSizes.length; i++) {
    let shipSize = shipSizes[i];
    let line = generateRandom(lines);
    let col = generateRandom(cols - shipSize);
    ship = [];
  
    for (j = 0; j < shipSize; j++) {
      ship[j] = [line, col+j]
    }
  
    ships[i] = ship;
  }

  console.log(ships);
  return ships;
}

function cellClick() {
  const row = this.parentNode.rowIndex;
  const col = this.cellIndex;
  console.log(row + " x " + col);

  if (checkForHit(row, col) == true) {
    this.style.backgroundColor = 'red'
    checkForWin();
  }else{
    this.style.backgroundColor = 'gray'
  }
  this.removeEventListener('click',cellClick);
}

function checkForHit(row,col) {
  for(let i=0; i<shipLocations.length; i++) {
    console.log(shipLocations[i]);
    for (let j=0; j < shipLocations[i].length; j++) {
      console.log(shipLocations[i][j]);
      if (shipLocations[i][j][0] == row && shipLocations[i][j][1] == col ) {
        hitTarget++;
        shipLocations[i].splice(j,1);

        if(!shipLocations[i].length) {
          shipLocations.splice(i,1);
        }
        return true;
      }
    }
  }

  return false;
}

function checkForWin() {
  if(shipLocations.length == 0) {
    alert("Paranbéns!!! Você ganhou");
  }
}