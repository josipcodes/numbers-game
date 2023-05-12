let gameContent = document.getElementsByClassName("game-window")[0];

let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");
let returnButtons = document.getElementsByClassName("return");
// let beginnerButton = document.getElementById("beginner");
// let intermediateButton = document.getElementById("intermediate");
// let expertButton = document.getElementById("expert");
let gameModeButtons = document.getElementsByClassName("game-type");

let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");
let gamePage = document.getElementById("game-container");
let gameTable = document.getElementById("game-table");

newGameButton.addEventListener("click", showDifficultyPage);
rulesButton.addEventListener("click", showRulesPage);
aboutButton.addEventListener("click", showAboutPage);
controlsButton.addEventListener("click", showControlsPage);
// beginnerButton.addEventListener("click", runGame);
// intermediateButton.addEventListener("click", runIntermediateMode);
// expertButton.addEventListener("click", runExpertMode);

for (let i = 0; i < gameModeButtons.length; i++) {
    gameModeButtons[i].addEventListener("click", runGame);
}

for (let i = 0; i < returnButtons.length; i++) {
    returnButtons[i].addEventListener("click", returnToMenu);
}

/**
 * Opens difficulty page
 */
function showDifficultyPage() {
    initialMenu.style.display = "none";
    difficultyMenu.style.display = "block";
}

/**
 * Opens rules page
 */
function showRulesPage() {
    initialMenu.style.display = "none";
    rulesPage.style.display = "block";
}

/**
 * Opens about page
 */
function showAboutPage() {
    initialMenu.style.display = "none";
    aboutPage.style.display = "block";
}

/**
 * Opens controls page
 */
function showControlsPage() {
    initialMenu.style.display = "none";
    controlsPage.style.display = "block";
}

/**
 * Opens main menu
 */
function returnToMenu() {
    initialMenu.style.display = "block";
    difficultyMenu.style.display = "none";
    rulesPage.style.display = "none";
    aboutPage.style.display = "none";
    controlsPage.style.display = "none";
    gamePage.style.display = "none";
}

/**
 * Runs game based on the difficulty chosen
 */
function runGame() {
    difficultyMenu.style.display = "none";
    gamePage.style.display = "grid";
    if (this.id === "intermediate") {
        for (let i = 0; i < 45; i++) {
            let newSpan = document.createElement("span");
            newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
        randomizer();
    } else if (this.id === "expert") {
        for (let i = 0; i < 70; i++) {
            let newSpan = document.createElement("span");
            newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
        randomizer();
    } else {
        for (let i = 0; i < 20; i++) {
            let newSpan = document.createElement("span");
            // newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
        randomizer();
    }
    playGame();
}


/**
 * Creates random numbers and adds them into relevant span elements
 */
function randomizer() {
    let emptySpan = document.getElementsByTagName("span");
    for (let i = 0; i < emptySpan.length; i++) {
        // if (emptySpan[i].textContent === "") {
        let randomNumber = Math.floor(Math.random() * 9 + 1);
        emptySpan[i].innerText = randomNumber;
        // }
    }
}

/**
 * Creates event listeners for all spans created
 */
function playGame() {
    let firstChoice = document.getElementsByTagName("span");
    for (let i = 0; i < firstChoice.length; i++) {
        firstChoice[i].addEventListener("click", highlight);
    }
}

let sum = 0;
let choices = [];

/**
 * Hightlights the chosen span pairs and calls for the check of choice.
 * If user clicks on the same span twice, choice is disregarded.
 */
function highlight(firstChoice) {
    this.style.backgroundColor = "yellow";
    this.class = "choice";
    choices.push(this);
    if (choices[0] === choices[1]) {
        choices[0].style.backgroundColor = "white";
        choices[1].style.backgroundColor = "white";
        choices = [];
        console.log("I ran");
    } else if (choices.length === 2) {
        checkChoice(choices);
    }
}

/**
 * Checks choices for sum and adjusts CSS accordingly. If the pair is viable, spans should change innerHTML to 0.
 * 
 */
function checkChoice(choices) {
    let sum = 0;
    sum = parseInt(choices[0].innerHTML) + parseInt(choices[1].innerHTML);
    if (sum === 10 || (choices[0].innerHTML == choices[1].innerHTML)) {
        choices[0].textContent = "0";
        choices[0].style.backgroundColor = "black";
        choices[1].textContent = "0";
        choices[1].style.backgroundColor = "black";
        console.log("I ran");
        console.log(choices[0], choices[1]);
    } else {
        choices[0].style.backgroundColor = "white";
        choices[1].style.backgroundColor = "white";
        console.log(choices[0], choices[1]);
        console.log("test");

    }
    choices = [];
    console.log(choices);
}