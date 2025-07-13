window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset-board');
    const resetGameButton = document.querySelector('#reset-game');
    const announcer = document.querySelector('.announcer');
    const counterX = document.querySelector('.counter-player.playerX .counter-value');
    const counterO = document.querySelector('.counter-player.playerO .counter-value');
    const counterTie = document.querySelector('.counter-tie .counter-value');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currPlayer = 'X';
    let isGameActive = true;
    let scoreX = 0;
    let scoreO = 0;
    let scoreTie = 0;

    const PLAYERX_WON = 'PLAYER_X_WON';
    const PLAYERO_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';

    /*
        Index ke board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function updateCounter() {
        counterX.innerText = scoreX;
        counterO.innerText = scoreO;
        counterTie.innerText = scoreTie;
    }

    let lastWinner = 'X';

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const condition = winningConditions[i];
            const a = board[condition[0]];
            const b = board[condition[1]];
            const c = board[condition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            if (currPlayer === 'X') {
                scoreX++;
                lastWinner = 'X';
                updateCounter();
            } else {
                scoreO++;
                lastWinner = 'O';
                updateCounter();
            }
            announce(currPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        
        if (!board.includes('')) {
            scoreTie++;
            lastWinner = 'Tie';
            updateCounter();
            announce(TIE);
            isGameActive = false;
        }
    }
        
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currPlayer}`);
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currPlayer;
        playerDisplay.classList.add(`player${currPlayer}`);
    } 

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currPlayer;
            tile.classList.add(`player${currPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currPlayer !== lastWinner) {
            changePlayer();
        }
        playerDisplay.innerText = currPlayer;
        playerDisplay.classList.remove('playerX', 'playerO');
        playerDisplay.classList.add(`player${currPlayer}`);

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index)); 
    });

    const resetGame = () => {
        resetBoard();
        scoreX = 0;
        scoreO = 0;
        scoreTie = 0;
        updateCounter();
        announcer.classList.add('hide');
    };
    resetButton.addEventListener('click', resetBoard);
    resetGameButton.addEventListener('click', resetGame);

        

    resetButton.addEventListener('click', resetBoard);
});
