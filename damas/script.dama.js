const boardElement = document.getElementById('board');
const boardSize = 8;
let selectedPiece = null;
let currentPlayer = 'red';
const pieces = [];

function createBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 0) {
                square.classList.add('white');
            } else {
                square.classList.add('black');
                if (row < 3) {
                    createPiece(square, 'red');
                } else if (row > 4) {
                    createPiece(square, 'black');
                }
            }
            square.dataset.row = row;
            square.dataset.col = col;
            boardElement.appendChild(square);
        }
    }
    updateDraggablePieces();
}

function createPiece(square, color) {
    const piece = document.createElement('div');
    piece.classList.add('piece', color);
    piece.draggable = color === currentPlayer;
    piece.addEventListener('dragstart', onDragStart);
    piece.addEventListener('dragend', onDragEnd);
    square.appendChild(piece);
    pieces.push(piece);
}

function updateDraggablePieces() {
    pieces.forEach(piece => {
        piece.draggable = piece.classList.contains(currentPlayer);
    });
}

function onDragStart(event) {
    if (event.target.classList.contains(currentPlayer)) {
        selectedPiece = event.target;
    } else {
        event.preventDefault();
    }
}

function onDragEnd(event) {
    if (!selectedPiece) return;

    const row = parseInt(event.target.parentElement.dataset.row);
    const col = parseInt(event.target.parentElement.dataset.col);
    const squares = Array.from(document.querySelectorAll('.square'));
    const validMove = (targetRow, targetCol) => {
        if (currentPlayer === 'red') {
            return targetRow === row + 1 && (targetCol === col + 1 || targetCol === col - 1);
        } else {
            return targetRow === row - 1 && (targetCol === col + 1 || targetCol === col - 1);
        }
    };

    const validCapture = (targetRow, targetCol) => {
        const midRow = (row + targetRow) / 2;
        const midCol = (col + targetCol) / 2;
        const midSquare = document.querySelector(`[data-row='${midRow}'][data-col='${midCol}']`);
        const midPiece = midSquare ? midSquare.firstChild : null;

        if (!midPiece || midPiece.classList.contains(currentPlayer)) return false;

        if (currentPlayer === 'red') {
            return targetRow === row + 2 && (targetCol === col + 2 || targetCol === col - 2);
        } else {
            return targetRow === row - 2 && (targetCol === col + 2 || targetCol === col - 2);
        }
    };

    let moveMade = false;
    squares.forEach(square => {
        const targetRow = parseInt(square.dataset.row);
        const targetCol = parseInt(square.dataset.col);

        if (validMove(targetRow, targetCol) && !square.firstChild) {
            square.appendChild(selectedPiece);
            moveMade = true;
        } else if (validCapture(targetRow, targetCol) && !square.firstChild) {
            const midRow = (row + targetRow) / 2;
            const midCol = (col + targetCol) / 2;
            const midSquare = document.querySelector(`[data-row='${midRow}'][data-col='${midCol}']`);
            const midPiece = midSquare.firstChild;

            midSquare.removeChild(midPiece);
            square.appendChild(selectedPiece);
            moveMade = true;
        }
    });

    if (moveMade) {
        switchPlayer();
    }

    selectedPiece = null;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
    updateDraggablePieces();
}

createBoard();
