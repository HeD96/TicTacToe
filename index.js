window.onload = function () {
    Gameboard.startMenu();
};

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

// const winScreen = document.createElement("div");
// winScreen.classList.add("win_screen", "invisible");
// wrapper.appendChild(winScreen);

// const newGameButton = document.createElement("button");
// newGameButton.classList.add("newGameButton");
// winScreen.appendChild(newGameButton);
// newGameButton.innerText = "Start Again";

const Gameboard = (function () {
    let gameArray = [];

    let startMenu = function () {
        const startButton = document.createElement("button");
        startButton.classList.add("start_button");
        wrapper.appendChild(startButton);
        startButton.innerText = "Start Game";
        startButton.addEventListener("click", setGameboard);
    };

    let setGameboard = function () {
        const gameboard = document.createElement("div");
        gameboard.classList.add("gameboard");
        wrapper.appendChild(gameboard);

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            gameboard.appendChild(cell);
            cell.addEventListener("click", function () {
                if (
                    !playerOne.indices.includes(i) &&
                    !playerTwo.indices.includes(i)
                ) {
                    Gameplay.currentTurn(cell, i);
                }
            });

            gameArray.push(cell);
        }
    };

    return {
        startMenu,
    };
})();

const Gameplay = (function () {
    let turn = 0;
    let hasAI = false;
    let winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let currentTurn = function (cell, i) {
        if (turn === 0) {
            playerOne.markCell(cell, i);
            turn = 1;
        } else if (turn === 1 && hasAI === false) {
            playerTwo.markCell(cell, i);
            turn = 0;
        }
    };

    let arrayCompare = function (indices) {
        let winArr = [];

        for (let i = 0; i < winCombos.length; i++) {
            const win = winCombos[i].every(function (value) {
                return indices.includes(value);
            });
            winArr.push(win);
        }

        return winArr;
    };

    let showWinscreen = function (phrase) {
        const winScreen = document.createElement("div");
        winScreen.classList.add("win_screen");
        wrapper.appendChild(winScreen);
        winScreen.innerText = phrase;

        const newGameButton = document.createElement("button");
        newGameButton.classList.add("newGameButton");
        winScreen.appendChild(newGameButton);
        newGameButton.innerText = "Start Again";
    };

    let winCheckOne = function (indicesArray) {
        let winPhrase = "Player 1 wins!";
        if (arrayCompare(indicesArray).includes(true)) {
            // winScreen.classList.remove("invisible");
            // winScreen.innerText = "Player one wins!";
            showWinscreen(winPhrase);
        }
    };

    let winCheckTwo = function (indicesArray) {
        let winPhrase = "Player 2 wins!";
        if (arrayCompare(indicesArray).includes(true)) {
            // winScreen.classList.remove("invisible");
            // winScreen.innerText = "Player two wins!";
            showWinscreen(winPhrase);
        }
    };

    return {
        currentTurn,
        winCheckOne,
        winCheckTwo,
    };
})();

function Player(playerState, isAI) {
    let _xmark = '<i class="fa-solid fa-xmark" style="color: #c70000;"></i>';
    let _omark = '<i class="fa-solid fa-o" style="color: #525fe1;"></i>';
    let player = playerState;
    let ai = isAI;
    let indices = [];

    let markCell = function (cell, i) {
        if (player === "one") {
            cell.innerHTML = _xmark;
            indices.push(i);
            setTimeout(function () {
                Gameplay.winCheckOne(indices);
            }, 1000);
        } else if (player === "two") {
            cell.innerHTML = _omark;
            indices.push(i);
            setTimeout(function () {
                Gameplay.winCheckTwo(indices);
            }, 1000);
        }
    };

    return {
        markCell,
        indices,
    };
}

const playerOne = Player("one", false);
const playerTwo = Player("two", false);
