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

function getWinRegions() { //Função que verifica se existem três regiões iguais em sequência e devolve as regiões
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}


function disabledRegion(element) {//função que permite apenas um click por região
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)

}

function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + 'Venceu!'
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
    const winRegions = getWinRegions()
    if (winRegions.length > 0) { //houve um vencedor
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        upDateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }

}


document.getElementById('start').addEventListener('click', initializeGame)