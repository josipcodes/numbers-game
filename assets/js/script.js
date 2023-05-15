let gameContent = document.getElementsByClassName("game-window")[0];

let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");
let returnButtons = document.getElementsByClassName("return");
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
 * Creates sufficient amount of spans based on the difficulty chosen.
 * Adds random number (1-9) to spans.
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

    } else if (this.id === "expert") {
        for (let i = 0; i < 70; i++) {
            let newSpan = document.createElement("span");
            newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
    } else {
        for (let i = 0; i < 20; i++) {
            let newSpan = document.createElement("span");
            // newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
    }
    randomizer();
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
    addCoordinates();

}

/**
 *  Creates span coordinates starting from 0,0. 
 * Current issue if X>9 resolved by splitting the string with a period (to account for x>9.
 * Y captured using .charAt
 */
function addCoordinates() {
    let emptySpan = document.getElementsByTagName("span");
    for (let i = 0; i < emptySpan.length; i++) {
        let stringCoordinateCalc = String(i / 9).split(".");
        if (stringCoordinateCalc[1] === undefined) {
            stringCoordinateCalc[1] = "0";
        }
        emptySpan[i].setAttribute(["data-y"], `${stringCoordinateCalc[0]}`);
        emptySpan[i].setAttribute(["data-x"], `${stringCoordinateCalc[1].charAt(0)}`);
    }
}


/**
 * Creates event listeners for all spans created. Ideally will only create listeners for spans which don't have a value of 0
 */
function playGame() {
    let firstChoice = document.getElementsByTagName("span");
    for (let i = 0; i < firstChoice.length; i++) {
        // if (firstChoice[i].textContent !== "0") { //.style.backgroundColor !== "black") { //innerHTML !== "0") { Doesn't currently work
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
    if (this.style.backgroundColor !== "black") { // Added to attempt combating event listener jumping to a nearby span, doesn't work elsewhere
        this.style.backgroundColor = "yellow";
        this.class = "choice";
        choices.push(this);
        if (choices[0] === choices[1]) {
            choices[0].style.backgroundColor = "white";
            choices[1].style.backgroundColor = "white";
            choices = [];
        } else if (choices.length === 2) {
            checkChoice(choices);
            choices = [];
        }
    }
}

/**
 * Checks choices for sum and adjusts CSS accordingly. If the pair is viable, spans should change innerHTML to 0.
 * 
 */
function checkChoice(choices) {
    let sum = 0;
    sum = parseInt(choices[0].innerHTML) + parseInt(choices[1].innerHTML);
    // const regex = /x:(\d+) y:(\d)/g;
    const coordinatesYZero = choices[0].getAttribute("data-y");
    const coordinatesXZero = choices[0].getAttribute("data-x");
    const coordinatesYOne = choices[1].getAttribute("data-y");
    const coordinatesXOne = choices[1].getAttribute("data-x");

    // const coordinatesOne = choices[1].getAttribute("data-coordinate").test(regex);
    // console.log(coordinatesZero, coordinatesOne);

    if ((sum === 10 || (choices[0].innerHTML === choices[1].innerHTML))) {
        if (coordinatesYZero === coordinatesYOne) {// && (choices[0]["data-coordinate"] === choices[1].innerHTML)
            choices[0].textContent = "0";
            choices[0].style.backgroundColor = "black";
            // choices[0].removeEventListener("click", function () { }); // Redundant because of playGame
            choices[1].textContent = "0";
            choices[1].style.backgroundColor = "black";
            // choices[1].removeEventListener("click", function () { }); // Redundant because of playGame
            console.log("Pair viable, y check");
            console.log(coordinatesYZero, coordinatesYOne);
        } else if (coordinatesXZero === coordinatesXOne) {
            choices[0].textContent = "0";
            choices[0].style.backgroundColor = "black";
            choices[1].textContent = "0";
            choices[1].style.backgroundColor = "black";
            console.log("Pair viable, x check");
            console.log(coordinatesXZero, coordinatesXOne);
        } else if (coordinatesYZero < coordinatesYOne) {
            console.log(coordinatesYZero, "is smaller than", coordinatesYOne);
        } else {
            console.log(coordinatesYZero, "is larger than", coordinatesYOne);
        }
    } else {
        choices[0].style.backgroundColor = "white";
        choices[1].style.backgroundColor = "white";
        console.log(choices[0], choices[1]);
        console.log("Pair not viable");
    }
    sum = 0;
    playGame();
}
