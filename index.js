const boardRegions = document.querySelectorAll('#gameBoard span') //criando as regiões do tabuleiro
const vBoard = [] //tabuleiro virtual
let turnPlayer = '' //jogador da vez

function upDateTitle() { //função p exibir o nome do jogador da vez
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}