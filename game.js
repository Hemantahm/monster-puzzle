// Game variables
let puzzle = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];
let score = 0;

// Function to shuffle puzzle pieces
function shufflePuzzle() {
    let flatPuzzle = puzzle.flat();
    for (let i = flatPuzzle.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [flatPuzzle[i], flatPuzzle[j]] = [flatPuzzle[j], flatPuzzle[i]];
    }
    puzzle = [
        flatPuzzle.slice(0, 3),
        flatPuzzle.slice(3, 6),
        flatPuzzle.slice(6, 9)
    ];
    renderPuzzle();
}

// Function to render puzzle
function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';
    puzzle.forEach(row => {
        row.forEach(piece => {
            const pieceDiv = document.createElement('div');
            pieceDiv.textContent = piece === 0 ? '' : piece;
            pieceDiv.setAttribute('data-id', piece);
            pieceDiv.addEventListener('click', handlePieceClick);
            puzzleContainer.appendChild(pieceDiv);
        });
    });
}

// Handle piece click
function handlePieceClick(event) {
    const clickedPiece = event.target;
    const pieceId = parseInt(clickedPiece.getAttribute('data-id'));

    if (pieceId !== 0) {
        const emptyPiece = document.querySelector('[data-id="0"]');
        [clickedPiece.textContent, emptyPiece.textContent] = [emptyPiece.textContent, clickedPiece.textContent];
        [clickedPiece.setAttribute('data-id', emptyPiece.textContent), emptyPiece.setAttribute('data-id', '0')];

        score++;
        document.getElementById('score-count').textContent = score;
    }
}

// Check puzzle for completion
function checkPuzzle() {
    let isComplete = true;
    let flatPuzzle = puzzle.flat();
    for (let i = 0; i < flatPuzzle.length; i++) {
        if (flatPuzzle[i] !== i) {
            isComplete = false;
            break;
        }
    }

    if (isComplete) {
        alert('You rescued the monster! Congratulations!');
    } else {
        alert('Keep trying!');
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    renderPuzzle();
});
