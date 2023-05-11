let gameContent = document.getElementsByClassName("game-window")[0];

let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");

newGameButton.addEventListener("click", chooseDifficultyPage);
rulesButton.addEventListener("click", rulesPage);
aboutButton.addEventListener("click", aboutPage);
controlsButton.addEventListener("click", controlsPage);


function chooseDifficultyPage() {
    gameContent.innerHTML = `<h1>Numbers Game</h1>
    <h2>Difficulty Level</h2>
    <button type="button" class="new-game-screen-button" data-type="beginner">Beginner</button>
    <button type="button" class="new-game-screen-button" data-type="intermediate">Intermediate</button>
    <button type="button" class="new-game-screen-button" data-type="expert">Expert</button>
    <br>
    <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    `;
    let returnButton = document.getElementById("return");
    returnButton.addEventListener("click", returnToMenu);
}

function rulesPage() {
    gameContent.innerHTML = `<h1>Numbers Game</h1>
    <h2>Rules</h2>
    <div>
    <p>
    The goal of the game is to remove all of the numbers from the board.
    <br>
    You can remove pairs of the same number or pairs which sum is 10.
    </p>
    </div>
    <div>
    <img>
    Placeholder
    </img>
    <p>
    Pairs can be removed within the same column, row or within neighboring rows as long as there are no other numbers between them.
    </p>
    <img>
    Placeholder 2
    </img>
    <p>
    If you are left with no choices, you can click on <em>Generate</em> and the board will duplicate all of the numbers you currently have on it, giving you more choices.
    </p>
    </div>
    <br>
    <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    `;
    let returnButton = document.getElementById("return");
    returnButton.addEventListener("click", returnToMenu);
}

function aboutPage() {
    gameContent.innerHTML = `<h1>Numbers Game</h1>
    <h2>About</h2>
    <div>
    <p>
    This game was inspired by the Numbers game and Numbers game 2 currently available on the Play Store.
    <br>
    This iteration was made for educational purposes only as a part of the course with Code Institute. The creator of this iteration missed their bus stop (and several more) whiole playing the game.
    <br>
    Beware.
    </p>
    </div>
    <br>
    <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    `;
    let returnButton = document.getElementById("return");
    returnButton.addEventListener("click", returnToMenu);
}

function controlsPage() {
    gameContent.innerHTML = `<h1>Numbers Game</h1>
    <h2>Controls</h2>
    <div>
    <p>
    <h3>
    Computer:
    </h3>
    Left click - choice
    <br>
    M - Mute
    <br>
    R - Brings up Rules
    <br>
    C - Brings up Controls
    <br>
    Q - Quit game
    </p>
    </div>
    <div>
    <p>
    ICON - Sound On
    <br>
    ICON2 - Sound Off
    </p>
    </div>
    <br>
    <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    `;
    let returnButton = document.getElementById("return");
    returnButton.addEventListener("click", returnToMenu);
}

function returnToMenu() {
    gameContent.innerHTML = `<h1>Numbers Game</h1>
                <button type="button" class="main-screen-button" id="new-game" data-type="new-game">New Game</button>
                <button type="button" class="main-screen-button" data-type="rules">Rules</button>
                <button type="button" class="main-screen-button" data-type="about">About</button>
                <button type="button" class="main-screen-button" data-type="controls">Controls</button>`;
}





//document.addEventListener("DOMContentLoaded", function () {
//    let buttons = document.getElementsByTagName("button");
//
//    for (let button of buttons) {
//        button.addEventListener("click", function () {
//            if (this.getAttribute("data-type") === "new-game") {
//                chooseDifficulty();
//            } else if (this.getAttribute("data-type") === "rules") {
//                ADDFUNCTIONHERE();
//            } else if (this.getAttribute("data-type") === "about") {
//                ADDFUNCTIONHERE();
//            } else if (this.getAttribute("data-type") === "controls") {
//                ADDFUNCTIONHERE();
//            }
//        });
//    }
//});




