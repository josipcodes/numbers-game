let gameContent = document.getElementsByClassName("game-window")[0];

let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");
let returnButtons = document.getElementsByClassName("return");
let beginnerButton = document.getElementById("beginner");
let intermediateButton = document.getElementById("intermediate");
let expertButton = document.getElementById("expert");

let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");

newGameButton.addEventListener("click", showDifficultyPage);
rulesButton.addEventListener("click", showRulesPage);
aboutButton.addEventListener("click", showAboutPage);
controlsButton.addEventListener("click", showControlsPage);
beginnerButton.addEventListener("click", runBeginnerMode);
intermediateButton.addEventListener("click", runIntermediateMode);
expertButton.addEventListener("click", runExpertMode);

for (let i = 0; i < returnButtons.length; i++) {
    returnButtons[i].addEventListener("click", returnToMenu);
}

function showDifficultyPage() {
    initialMenu.style.display = "none";
    difficultyMenu.style.display = "block";
}

function showRulesPage() {
    initialMenu.style.display = "none";
    rulesPage.style.display = "block";
}

function showAboutPage() {
    initialMenu.style.display = "none";
    aboutPage.style.display = "block";
}

function showControlsPage() {
    initialMenu.style.display = "none";
    controlsPage.style.display = "block";
}

function returnToMenu() {
    initialMenu.style.display = "block";
    difficultyMenu.style.display = "none";
    rulesPage.style.display = "none";
    aboutPage.style.display = "none";
    controlsPage.style.display = "none";
}
