const boardRegions = document.querySelectorAll('#gameBoard span') //criando as regiões do tabuleiro
let vBoard = [] //tabuleiro virtual
let turnPlayer = '' //jogador da vez

function upDateTitle() { //função p exibir o nome do jogador da vez
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() { //função para inicializar o jogo e preparar o tabuleiro
    vBoard = [['','',''] , ['','',''] , ['','',''] ] //para mostrar no console como está o tabuleiro
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    upDateTitle()
    boardRegions.forEach(function (element){
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
    })
}

function disabledRegion(element) {//função que permite apenas um click por região
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)

}

function handleBoardClick(ev) { //Função direcionada para quando o jogador clicar na região do tabuleiro
    const span = ev.currentTarget
    const region = span.dataset.region // N.N
    const rowColumnPair = region.split('.') // ["N", "N"]
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    // Marca a região clicada com o símbolo do jogador
    if (turnPlayer === 'player1') {
      span.innerText = 'X'
      vBoard[row][column] = 'X'
    } else {
      span.innerText = 'O'
      vBoard[row][column] = 'O'
    }
    // Limpa o console e exibe nosso tabuleiro virtual
    console.clear()
    console.table(vBoard)
    disabledRegion(span)
}

document.getElementById('start').addEventListener('click', initializeGame)