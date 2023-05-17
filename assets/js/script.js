/** 
 * DOM related variables
*/
let newGameButton = document.getElementById("new-game");
let rulesButton = document.getElementById("rules");
let aboutButton = document.getElementById("about");
let controlsButton = document.getElementById("controls");
let continueGameButton = document.getElementById("continue-game");
let returnButtons = document.getElementsByClassName("return");
let gameModeButtons = document.getElementsByClassName("game-type");
let returnToMenuButton = document.getElementById("in-game-return");
let generateButton = document.getElementById("generate");
let undoButton = document.getElementById("undo");
let quitGameButton = document.getElementById("quit-game");

// let gameContent = document.getElementsByClassName("game-window")[0];
let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");
let gamePage = document.getElementById("game-container");
let gameTable = document.getElementById("game-table");

/** 
 * Event listeners
*/
newGameButton.addEventListener("click", showDifficultyPage);
rulesButton.addEventListener("click", showRulesPage);
aboutButton.addEventListener("click", showAboutPage);
controlsButton.addEventListener("click", showControlsPage);
continueGameButton.addEventListener("click", continueGame);
returnToMenuButton.addEventListener("click", pauseGame);
generateButton.addEventListener("click", generateMoreSpans);
undoButton.addEventListener("click", undoAction);

for (let i = 0; i < gameModeButtons.length; i++) {
    gameModeButtons[i].addEventListener("click", runGame);
}

for (let i = 0; i < returnButtons.length - 1; i++) {
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
 * If user closes a previous session by clicking on new game, deletes previous spans and generates new game.
 * MVP: Current state. Future potential - each difficulty level could generate a random amount of spans (15-25, 25-50, 50-100)
 */
function runGame() {
    const spans = document.getElementsByTagName("span");
    const spansLength = spans.length;
    if (spans.length !== 0) {
        for (let i = 0; i < spansLength; i++) {
            gameTable.removeChild(spans[0]);
        }
    }
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
 * Creates random numbers (1-9) and adds them into relevant span elements
 */
function randomizer() {
    let spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
        // if (spans[i].textContent === "") {
        let randomNumber = Math.floor(Math.random() * 9 + 1);
        spans[i].innerText = randomNumber;
        spans[i].value = spans[i].innerText;
        // }
    }
    addLocation();
}

/**
 *  Creates span coordinates starting from 0,0. 
 * Current issue if X>9 resolved by splitting the string by a period.
 * Y captured using .charAt
 */
function addLocation() {
    let spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
        let stringCoordinateCalc = String(i / 9).split(".");
        if (stringCoordinateCalc[1] === undefined) {
            stringCoordinateCalc[1] = "0";
        }
        spans[i].setAttribute(["data-y"], `${stringCoordinateCalc[0]}`);
        spans[i].setAttribute(["data-x"], `${stringCoordinateCalc[1].charAt(0)}`);
        spans[i].setAttribute(["data-place"], `${i}`);
    }
    playGame();
}


/**
 * Creates event listeners for all spans created. Ideally will only create listeners for spans which don't have a value of 0
 */
function playGame() {
    let choice = document.getElementsByTagName("span");
    for (let i = 0; i < choice.length; i++) {
        // if (choice[i].textContent !== "0") { //.style.backgroundColor !== "black") { //innerHTML !== "0") { Doesn't currently work
        choice[i].addEventListener("click", highlight);
    }
}


let sum = 0;
let choices = [];

/**
 * Hightlights the chosen span pairs and calls for the check of choice.
 * If user clicks on the same span twice, choice is disregarded.
 */
function highlight() {
    if (this.style.backgroundColor !== "black") { // Added to attempt combating event listener jumping to a nearby span, doesn't work elsewhere
        this.style.backgroundColor = "yellow";
        choices.push(this);
        if (choices[0] === choices[1]) {
            // moved to
            cancelChoice();
            // choices[0].style.backgroundColor = "white";
            // choices[1].style.backgroundColor = "white";
            // choices = [];
        } else if (choices.length === 2) {
            console.log("blabla");
            checkLocation(choices);
            choices = [];
        }
    }
}

/**
 * Checks location of the choices by x and y coordinates as well as placement.
 */
function checkLocation(choices) {
    const coordinatesYZero = Number(choices[0].getAttribute("data-y"));
    const coordinatesXZero = Number(choices[0].getAttribute("data-x"));
    const coordinatesYOne = Number(choices[1].getAttribute("data-y"));
    const coordinatesXOne = Number(choices[1].getAttribute("data-x"));
    // are the below 2 necessary?
    const placeYZero = Number(choices[0].getAttribute("data-place"));
    const placeYOne = Number(choices[1].getAttribute("data-place"));
    const placeYMin = Math.min(placeYZero, placeYOne);
    const placeYMax = Math.max(placeYZero, placeYOne);
    const coordinatesYMin = Math.min(coordinatesYZero, coordinatesYOne);
    const coordinatesYMax = Math.max(coordinatesYZero, coordinatesYOne);
    const coordinatesXMin = Math.min(coordinatesXZero, coordinatesXOne);
    const coordinatesXMax = Math.max(coordinatesXZero, coordinatesXOne);

    if (coordinatesYZero === coordinatesYOne) {
        if (coordinatesXMin + 1 === coordinatesXMax) {
            // works correctly
            console.log("neighbor by x");
            checkContent();
        } else {
            let allY = document.querySelectorAll(`[data-y="${coordinatesYZero}"]`);
            let neighborsXSum = 0;
            for (let i = coordinatesXMin + 1; i < coordinatesXMax; i++) {
                neighborsXSum += Number(allY[i].innerHTML);
                console.log("neighborsXSum", neighborsXSum);
            }
            if (neighborsXSum === 0) {
                checkContent();
                console.log("I work...or do I? 2");
            } else {
                cancelChoice();
            }
        }
    } else if (coordinatesXZero === coordinatesXOne) {
        if (coordinatesYMin + 1 === coordinatesYMax) {
            // works correctly
            console.log("neighbor by y");
            checkContent();
        } else {
            let allX = document.querySelectorAll(`[data-x="${coordinatesXZero}"]`);
            let neighborsYSum = 0;
            console.log(coordinatesYMin, coordinatesYMax, "min max y");
            for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
                neighborsYSum += Number(allX[i].innerHTML);
                console.log("neighborsYSum", neighborsYSum, "something's wrong");
            }
            if (neighborsYSum === 0) {
                checkContent();
                console.log("neighborsYSum");
                console.log("I work...or do I? 4");
            } else {
                cancelChoice();
            }
        }

    } else if (placeYMin !== placeYMax) {
        let allPlaces = document.querySelectorAll(`[data-place]`);
        let betweenSpanSum = 0;
        // console.log(placeYZero, placeYOne, betweenSpanSum);
        console.log(placeYMin);
        console.log(placeYMax);
        for (let i = placeYMin + 1; i < placeYMax; i++) {
            betweenSpanSum += Number(allPlaces[i].innerHTML);
            console.log(betweenSpanSum, "betweenSpanSum");
        }
        if (betweenSpanSum === 0) {
            checkContent();
            console.log("I work...or do I? 5!");
        } else {
            cancelChoice();
        }
        // } else if (coordinatesYMin !== coordinatesYMax) {
        //     let allPlaces = document.querySelectorAll(`[data-place]`);
        //     let betweenSpanSum = 0;
        //     // console.log(placeYZero, placeYOne, betweenSpanSum);
        //     for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
        //         betweenSpanSum += Number(allPlaces[i].innerHTML);
        //     }
        //     if (betweenSpanSum === 0) {
        //         checkContent();
        //         console.log("I work...or do I? 5");
        //     } else {
        //         cancelChoice();
        //     }
    } else {
        cancelChoice();
    }
}

/**
 * Checks content of spans
 */
function checkContent() {
    let sum = 0;
    sum = parseInt(choices[0].innerHTML) + parseInt(choices[1].innerHTML);
    if (sum === 10 || (choices[0].innerHTML === choices[1].innerHTML)) {
        console.log(choices[0].innerHTML, choices[1].innerHTML);
        memory();
        // removeViablePair();
        console.log("checkContent if reached");
    } else {
        cancelChoice();
        console.log("checkContent else reached");
    }
}

/**
 * Cancels choice if pair is not viable
 */
function cancelChoice() {
    choices[0].style.backgroundColor = "white";
    choices[1].style.backgroundColor = "white";
    console.log("Pair not viable");
    sum = 0;
    playGame();
    choices = [];
}

/** 
 * Checks for and removes an empty row
*/
function removeEmptyRow() {
    let amountOfSpans = document.querySelectorAll("[data-place]").length;
    for (let i = 0; i < (Math.floor(amountOfSpans / 9)); i++) {
        let collection = 0;
        let wholeRow = document.querySelectorAll(`[data-y="${i}"]`);
        for (let j = 0; j < 9; j++) {
            collection += Number(wholeRow[j].innerHTML);
        }
        if (collection === 0) {
            let emptyRow = document.querySelectorAll(`[data-y="${i}"]`);
            for (let i = 0; i < emptyRow.length; i++) {
                emptyRow[i].remove();
            }
        }
    }
    addLocation();
}

/** 
 * Opens main menu
*/
function pauseGame() {
    returnToMenu();
    continueGameButton.style.display = "block";
    quitGameButton.style.display = "block";
}

/** 
 * Brings user back into the game
*/
function continueGame() {
    initialMenu.style.display = "none";
    continueGameButton.style.display = "none";
    quitGameButton.style.display = "none";
    gamePage.style.display = "grid";
}

let generateSpans = [];

/** 
 * Generates new spans after the user presses "generate".
 * This is done by only taking into account spans on the board which don't have inner.HTML = 0.
*/
function generateMoreSpans() {
    let spans = document.getElementsByTagName("span");
    let spansLength = spans.length;
    for (let i = 0; i < spansLength; i++) {
        if (spans[i].style.backgroundColor !== "black") {
            generateSpans.push(spans[i]);
        }
    }
    for (let i = 0; i < generateSpans.length; i++) {
        let newSpan = document.createElement("span");
        newSpan.textContent = generateSpans[i].innerHTML;
        gameTable.appendChild(newSpan);
    }
    addLocation();
    generateSpans = [];
}

/** 
 * Outside of MVP, should check if the game is no longer solvable.
*/

let memory = [];

function undoMemory() {
    let spans = document.getElementsByTagName("span");
    memory.push(spans);
    console.log(memory, "undoMemory");
    // // console.log("before spans are noted");
    // // console.log(spans);
    removeViablePair();
}

function undoAction() {
    let spans = document.getElementsByTagName("span");
    let spansLength = spans.length;
    for (let i = 0; i < spansLength; i++) {
        gameTable.removeChild(spans[0]);
    }
    console.log(memory, "undoAction");
    // console.log(memory[memory.length - 1]);
    // let previousState = memory[memory.length - 1];

    // console.log(typeof (previousState), "previous State");
    // for (let i = 0; i < previousState.length; i++)
    //     gameTable.appendChild(previousState[i]);
    // console.log(`adding Element ${i}`);
    // console.log(previousState.length);
}

/** 
 * Outside of MVP, should check if the game is no longer solvable.
*/
function checkIfNotSolvable() {
    console.log("if only 3 rows, if only 2 spans !== 0, if sum !== 10, if span1 !== span2, if both are !== odd or even placed, if span1 is !== even placed (if length even).");
}

/** 
 * Removes a pair if all conditions are met.
*/
function removeViablePair() {
    console.log(choices[0].textContent, "removeviablepair");
    choices[0].textContent = "0";
    choices[0].style.backgroundColor = "black";
    // choices[0].removeEventListener("click", function () { }); // Redundant because of playGame
    choices[1].textContent = "0";
    choices[1].style.backgroundColor = "black";
    // choices[1].removeEventListener("click", function () { }); // Redundant because of playGame
    removeEmptyRow();
    // let spans = document.getElementsByTagName("span");
    // memory.push(spans);
    // console.log("before spans are noted");
    // console.log(spans);
    playGame();
}