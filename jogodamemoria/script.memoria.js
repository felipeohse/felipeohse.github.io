const gameBoard = document.getElementById('game-board');
const cards = [
    'A', 'A', 'B', 'B', 
    'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 
    'G', 'G', 'H', 'H'
];
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        matchedCards += 2;

        if (matchedCards === cards.length) {
            setTimeout(resetGame, 1000);
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

function resetGame() {
    alert('Parabéns, você ganhou! O jogo será reiniciado.');
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    createBoard();
}

createBoard();
