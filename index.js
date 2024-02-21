const boardRegions = document.querySelectorAll('#gameBoard span') //criando as regiões do tabuleiro
const vBoard = [] //tabuleiro virtual
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