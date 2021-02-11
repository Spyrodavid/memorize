
var x = 2


const mybutton = document.getElementById('mybutton')
var cellElements = [];
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const autostartButton = document.getElementById('auto')
const randButton = document.getElementById('randbutton')
let circleTurn
let auto = false

startGame()
mybutton.addEventListener('click', changegrid)
autostartButton.addEventListener('click', autoset)
restartButton.addEventListener('click', double)
randButton.addEventListener('click', pickrandom)
currentClass = 'color-orangered'
function double(){
  x=2
  changegrid()
  resetGame()
}
function autoset(){
  auto = !auto
}

function startGame() {
  changegrid()
  resetGame()
}

function resetGame() {
  cellElements = document.querySelectorAll('[data-cell]')
  cellElements.forEach(cell => {
    cell.classList.remove('color-orangered')
    cell.classList.remove('color-blue')
    cell.classList.remove('buffer')

    cell.removeEventListener('click', handleClick)
    cell.removeEventListener("contextmenu", e => e.preventDefault());
    cell.removeEventListener('contextmenu', handleClick)
    cell.addEventListener('click', handleClick,{ once: true })
    cell.addEventListener('contextmenu', handleClick)
    cell.addEventListener("contextmenu", e => e.preventDefault());
    
    winningMessageElement.classList.remove('show')
  })
}



function handleClick(e) {
    const cell = e.target
    const type = e.type
    if (doesboxhavecolor(e)){
    if (type == 'click') {
      if (cell.classList.contains('buffer')){
        
    addcolor(cell, currentClass)
      } else{
        
        winningMessageElement.classList.add('show')
        
      }
    } else if (type == 'contextmenu'){
      addcolor(cell, currentClass)
      setTimeout(() => {  removecolor(cell, currentClass) ; }, 2000);
      
    }
    if (checkrestart()){
      console.log('coolio')
      changegrid()
      }
    }
  }


function addcolor(cell,currentclass) {
    cell.classList.add(currentclass)
}

function removecolor(cell,currentclass) {
  cell.classList.remove(currentclass)
}

function doesboxhavecolor(e){
  return !e.target.classList.contains(currentClass)
}

function checkrestart() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('buffer') && cell.classList.contains(currentClass)||!cell.classList.contains('buffer') && !cell.classList.contains(currentClass)
})}

function changegrid(){
  x++
  removeAllChildNodes(board)
  board.style.gridTemplateColumns= `repeat(${x},auto)`
  addAllChildNodes()
  resetGame()
  
  
}

function abc(){
  cell.classList.add('color-orangered')
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addAllChildNodes(){
  
  for (let step = 0; step < x**2; step++) {
    var cello = document.createElement("div")
    cello.setAttribute("data-cell", '')
    cello.classList.add("cell")
    board.appendChild(cello)
}}

function pickrandom() {
    for (cell of getRandomList()) {
      let cellZ = [...cellElements][cell]
      cellZ.classList.add('color-blue')
      setTimeout(() => {  
        removecolor(cellZ, 'color-blue')
        cellZ.classList.add('buffer')
       ; }, 2000);
      
   
    }
}

function getRandomList(){
  var randomList = new Set()
  while (randomList.size < x*2) {
  randomList.add(Math.floor(Math.random() * x**2))
  }
  return randomList
}