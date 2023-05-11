let gameContent = document.getElementsByClassName("game-window")[0];

let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");

let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");

newGameButton.addEventListener("click", showDifficultyPage);
rulesButton.addEventListener("click", showRulesPage);
aboutButton.addEventListener("click", showAboutPage);
controlsButton.addEventListener("click", showControlsPage);

function showDifficultyPage() {
    initialMenu.style.display = "none";
    difficultyMenu.style.display = "block";
}

function showRulesPage() {
    initialMenu.style.display = "none";
    rulesPage.style.display = "block";
    // gameContent.innerHTML = `<h1>Numbers Game</h1>
    // <h2>Rules</h2>
    // <div>
    // <p>
    // The goal of the game is to remove all of the numbers from the board.
    // <br>
    // You can remove pairs of the same number or pairs which sum is 10.
    // </p>
    // </div>
    // <div>
    // <img>
    // Placeholder
    // </img>
    // <p>
    // Pairs can be removed within the same column, row or within neighboring rows as long as there are no other numbers between them.
    // </p>
    // <img>
    // Placeholder 2
    // </img>
    // <p>
    // If you are left with no choices, you can click on <em>Generate</em> and the board will duplicate all of the numbers you currently have on it, giving you more choices.
    // </p>
    // </div>
    // <br>
    // <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    // `;
    // let returnButton = document.getElementById("return");
    // returnButton.addEventListener("click", returnToMenu);
}

function showAboutPage() {
    initialMenu.style.display = "none";
    aboutPage.style.display = "block";
    // gameContent.innerHTML = `<h1>Numbers Game</h1>
    // <h2>About</h2>
    // <div>
    // <p>
    // This game was inspired by the Numbers game and Numbers game 2 currently available on the Play Store.
    // <br>
    // This iteration was made for educational purposes only as a part of the course with Code Institute. The creator of this iteration missed their bus stop (and several more) whiole playing the game.
    // <br>
    // Beware.
    // </p>
    // </div>
    // <br>
    // <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    // `;
    // let returnButton = document.getElementById("return");
    // returnButton.addEventListener("click", returnToMenu);
}

function showControlsPage() {
    initialMenu.style.display = "none";
    controlsPage.style.display = "block";
    // gameContent.innerHTML = `<h1>Numbers Game</h1>
    // <h2>Controls</h2>
    // <div>
    // <p>
    // <h3>
    // Computer:
    // </h3>
    // Left click - choice
    // <br>
    // M - Mute
    // <br>
    // R - Brings up Rules
    // <br>
    // C - Brings up Controls
    // <br>
    // Q - Quit game
    // </p>
    // </div>
    // <div>
    // <p>
    // ICON - Sound On
    // <br>
    // ICON2 - Sound Off
    // </p>
    // </div>
    // <br>
    // <button type="button" class="new-game-screen-button" id="return" data-type="return">Return to Main Menu</button>
    // `;
    // let returnButton = document.getElementById("return");
    // returnButton.addEventListener("click", returnToMenu);
}

// function returnToMenu() {
//     gameContent.innerHTML = `<h1>Numbers Game</h1>
//                 <button type="button" class="main-screen-button" id="new-game" data-type="new-game">New Game</button>
//                 <button type="button" class="main-screen-button" id="rules" data-type="rules">Rules</button>
//                 <button type="button" class="main-screen-button" id="about" data-type="about">About</button>
//                 <button type="button" class="main-screen-button" id="controls" data-type="controls">Controls</button>`;

//     onReturn();
// }

// function onReturn() {
//     console.log("I work");
//     newGameButton.addEventListener("click", chooseDifficultyPage);
//     console.log(newGameButton);
//     rulesButton.addEventListener("click", rulesPage);
//     aboutButton.addEventListener("click", aboutPage);
//     controlsButton.addEventListener("click", controlsPage);
// }




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