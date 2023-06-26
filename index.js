const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const Gameboard = (function () {
    let gameArray = [];

    let setGameboard = function () {
        const gameboard = document.createElement("div");
        gameboard.classList.add("gameboard");
        wrapper.appendChild(gameboard);

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            gameboard.appendChild(cell);
            cell.addEventListener("click", function () {
                Gameplay.currentTurn(cell, i);
            });

            gameArray.push(cell);
        }
    };

    return {
        setGameboard,
    };
})();

const Gameplay = (function () {
    let turn = 0;

    let currentTurn = function (cell, i) {
        if (turn === 0) {
            playerOne.markCell(cell, i);
            turn = 1;
        } else if (turn === 1) {
            playerTwo.markCell(cell, i);
            turn = 0;
        }
    };

    return {
        currentTurn,
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
        } else if (player === "two") {
            cell.innerHTML = _omark;
            indices.push(i);
        }
    };

    return {
        markCell,
        indices,
    };
}

const playerOne = Player("one", false);
const playerTwo = Player("two", false);

// window.onload = function () {
//     gameBoard.startMenu();
// };

// const wrapper = document.createElement("div");
// wrapper.classList.add("wrapper");
// document.body.appendChild(wrapper);

// function Player(playerState, isAI) {
//     let player = playerState;
//     let ai = isAI;
//     let score = 0;

//     return {
//         player,
//         ai,
//         score,
//     };
// }

// const gameBoard = (function () {
//     let hasAI;
//     let startMenu = function () {
//         const aiPlayer = document.createElement("button");
//         aiPlayer.classList.add("opponent_button", "one");
//         wrapper.appendChild(aiPlayer);
//         aiPlayer.innerText = "One Player";
//         aiPlayer.addEventListener("click", function () {
//             hasAI = true;
//             gamePlay.createPlayer(hasAI);
//         });

//         const secondPlayer = document.createElement("button");
//         secondPlayer.classList.add("opponent_button", "two");
//         wrapper.appendChild(secondPlayer);
//         secondPlayer.innerText = "Two Players";
//         secondPlayer.addEventListener("click", function () {
//             hasAI = false;
//             gamePlay.createPlayer(hasAI);
//         });

//         const startButton = document.createElement("button");
//         startButton.classList.add("start_button");
//         startButton.addEventListener("click", setGameboard);
//         wrapper.appendChild(startButton);
//         startButton.innerText = "Start Game";
//     };

//     let setGameboard = function () {
//         const gameboard = document.createElement("div");
//         gameboard.classList.add("gameboard");
//         wrapper.appendChild(gameboard);

//         let cells = [];

//         for (let i = 0; i < 9; i++) {
//             let cell = document.createElement("div");
//             cell.classList.add("cell");
//             gameboard.appendChild(cell);

//             cells.push(cell);
//         }

//         gamePlay.markCell(cells);
//     };

//     return {
//         startMenu,
//     };
// })();

// const gamePlay = (function () {
//     let _xmark = '<i class="fa-solid fa-xmark" style="color: #c70000;"></i>';
//     let _omark = '<i class="fa-solid fa-o" style="color: #525fe1;"></i>';
//     let turn = 0;

//     let createPlayer = function (ai) {
//         if (ai === true) {
//         } else if (ai === false) {
//         }
//     };

//     let markCell = function (cellArr) {
//         cellArr.forEach(function (cell) {
//             cell.addEventListener("click", function () {
//                 if (turn === 0) {
//                     cell.innerHTML = _xmark;
//                     turn = 1;
//                 } else if (turn === 1) {
//                     cell.innerHTML = _omark;
//                     turn = 0;
//                 }
//             });
//         });
//     };

//     return {
//         markCell,
//         createPlayer,
//     };
// })();
