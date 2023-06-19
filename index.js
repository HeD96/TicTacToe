window.onload = function () {
    gameBoard.startMenu();
};

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const gameBoard = (function () {
    let startMenu = function () {
        const secondPlayer = document.createElement("button");
        secondPlayer.classList.add("opponent_button", "one");
        wrapper.appendChild(secondPlayer);
        secondPlayer.innerText = "One Player";

        const aiPlayer = document.createElement("button");
        aiPlayer.classList.add("opponent_button", "two");
        wrapper.appendChild(aiPlayer);
        aiPlayer.innerText = "Two Players";

        const startButton = document.createElement("button");
        startButton.classList.add("start_button");
        startButton.addEventListener("click", setGameboard);
        wrapper.appendChild(startButton);
        startButton.innerText = "Start Game";
    };

    let setGameboard = function () {
        const gameboard = document.createElement("div");
        gameboard.classList.add("gameboard");
        wrapper.appendChild(gameboard);

        let cells = [];

        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            gameboard.appendChild(cell);

            cells.push(cell);
        }

        //this should be in game session object

        cells.forEach(function (cell) {
            cell.addEventListener("click", function () {
                if (gamePlay.turn === 0) {
                    cell.innerHTML = gamePlay.mark(playerOne.player);
                    gamePlay.turn = 1;
                } else if (gamePlay.turn === 1) {
                    cell.innerHTML = gamePlay.mark(playerTwo.player);
                    gamePlay.turn = 0;
                }
            });
        });
    };

    return {
        startMenu,
    };
})();

const gamePlay = (function () {
    let _xmark = '<i class="fa-solid fa-xmark" style="color: #c70000;"></i>';
    let _omark = '<i class="fa-solid fa-o" style="color: #525fe1;"></i>';
    let turn = 0;

    let mark = function (player) {
        if (player === "one") {
            return _xmark;
        } else if (player === "two") {
            return _omark;
        }
    };

    return {
        mark,
        turn,
    };
})();

function Player(playerState) {
    let player = playerState;

    return {
        player,
    };
}

const playerOne = Player("one");
const playerTwo = Player("two");
