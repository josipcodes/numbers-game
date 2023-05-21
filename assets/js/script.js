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
let hintButton = document.getElementById("hint");
let removeFifthButton = document.getElementById("remove-fifth");
let quitGameButton = document.getElementById("quit-game");

// let gameContent = document.getElementsByClassName("game-window")[0];
let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");
let gamePage = document.getElementById("game-container");
let gameTable = document.getElementById("game-table");
let gameScore = document.getElementById("score");
let game = document.getElementById("beginner-mode");

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
hintButton.addEventListener("click", provideHint);
removeFifthButton.addEventListener("click", removeFifth);

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
    game.style.display = "block";
    score = 0;
    calculateScore();
    const spans = gameTable.getElementsByTagName("span");
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
    let spans = gameTable.getElementsByTagName("span");
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
    let spans = gameTable.getElementsByTagName("span");
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
    let choice = gameTable.getElementsByTagName("span");
    for (let i = 0; i < choice.length; i++) {
        choice[i].addEventListener("click", highlight);
        console.log("adding event listeners");
    }
    calculateScore();
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
            checkContent();
        } else {
            let allY = document.querySelectorAll(`[data-y="${coordinatesYZero}"]`);
            let neighborsXSum = 0;
            for (let i = coordinatesXMin + 1; i < coordinatesXMax; i++) {
                neighborsXSum += Number(allY[i].innerHTML);
            }
            if (neighborsXSum === 0) {
                checkContent();
            } else {
                cancelChoice();
            }
        }
    } else if (coordinatesXZero === coordinatesXOne) {
        if (coordinatesYMin + 1 === coordinatesYMax) {
            checkContent();
        } else {
            let allX = document.querySelectorAll(`[data-x="${coordinatesXZero}"]`);
            let neighborsYSum = 0;
            for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
                neighborsYSum += Number(allX[i].innerHTML);
            }
            if (neighborsYSum === 0) {
                checkContent();
            } else {
                cancelChoice();
            }
        }

    } else if (placeYMin !== placeYMax) {
        let allPlaces = document.querySelectorAll(`[data-place]`);
        let betweenSpanSum = 0;
        for (let i = placeYMin + 1; i < placeYMax; i++) {
            betweenSpanSum += Number(allPlaces[i].innerHTML);
        }
        if (betweenSpanSum === 0) {
            checkContent();
        } else {
            cancelChoice();
        }
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
        // memory();
        removeViablePair();
    } else {
        cancelChoice();
    }
}

/**
 * Cancels choice if pair is not viable
 */
function cancelChoice() {
    choices[0].style.backgroundColor = "white";
    choices[1].style.backgroundColor = "white";
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
            score += 10;
            calculateScore();
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
    undoButton.classList.add("hide");
    let spans = gameTable.getElementsByTagName("span");
    console.log(spans, "generateMoreSpans");
    let spansLength = spans.length;
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].classList.contains("hint")) {
            spans[i].classList.remove("hint");
        }
    }
    if (generateButton.classList.contains("hint")) {
        generateButton.classList.remove("hint");
    }
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
 * Outside of MVP, should undo the last action
*/

let memory = [];

function undoAction() {
    if (score <= 5) {
        score = 0;
    } else {
        score -= 5;
    }
    undoButton.classList.add("hide");
    let memoryChildren = memory.getElementsByTagName("span");
    console.log(memoryChildren, "memory length");
    for (let x = 0; x < memoryChildren.length; x++) {
        if (memoryChildren[x].style.backgroundColor === "yellow") {
            memoryChildren[x].style.backgroundColor = "";
        }
    }
    gameTable.remove();
    gamePage.appendChild(memory);
    memory = [];
    gameTable = document.getElementById("game-table");
    // let spans = gameTable.getElementsByTagName("span");
    playGame();
    // for (let i = 0; i < spans.length; i++) {
    //     if (spans[i].style.backgroundColor = "yellow") {
    //         console.log("checking background color", i, spans[i].style.backgroundColor)
    //         spans[i].style.removeProperty("background-color")
    //     }
}
// }

/** 
 * Outside of MVP, provides a hint, but costs 5 points.
 * Current unexpected behaviour - generate button triggers after the last pair is hinted, not removing after a cycle.
*/
function provideHint() {
    if (score >= 5) {
        score -= 5;
    } else {
        score = 0;
    }
    calculateScore();
    let spans = gameTable.getElementsByTagName("span");
    let choices = [];
    // Loop runs as many times as there are spans on the board, minus one as there is no need to check the last span.
    let startOfCheck = 0;
    for (let x = 0; x < spans.length; x++) {
        if (spans[x].classList.contains("hint")) {
            startOfCheck = x;
            spans[x].classList.remove("hint");
        }
    }
    loopOne:
    for (let i = startOfCheck; i < spans.length - 2; i++) {
        // Loop runs as many times as there are spans on the board, counting from the current i + 1.
        for (let j = i + 1; j < spans.length; j++) {
            let spanIValue = Number(spans[i].innerHTML);
            let spanJValue = Number(spans[j].innerHTML);
            sum = spanIValue + spanJValue;

            let coordinatesYZero = Number(spans[i].getAttribute("data-y"));
            let coordinatesXZero = Number(spans[i].getAttribute("data-x"));
            let coordinatesYOne = Number(spans[j].getAttribute("data-y"));
            let coordinatesXOne = Number(spans[j].getAttribute("data-x"));
            let placeYZero = Number(spans[i].getAttribute("data-place"));
            let placeYOne = Number(spans[j].getAttribute("data-place"));
            let placeYMin = Math.min(placeYZero, placeYOne);
            let placeYMax = Math.max(placeYZero, placeYOne);
            let coordinatesYMin = Math.min(coordinatesYZero, coordinatesYOne);
            let coordinatesYMax = Math.max(coordinatesYZero, coordinatesYOne);
            let coordinatesXMin = Math.min(coordinatesXZero, coordinatesXOne);
            let coordinatesXMax = Math.max(coordinatesXZero, coordinatesXOne);

            //  if statement checks inner HTML of i and j as long as the current i inner HTML isn't 0 (previously removed item).
            if ((spanIValue === spanJValue || sum === 10) && spanIValue !== 0) {
                // if statement check if both i and j are in the same row
                if (coordinatesYZero === coordinatesYOne) {
                    // if statement checks if i and j are touching in a column (x). If yes, i and j are pushed into choices array.
                    if (coordinatesXMin + 1 === coordinatesXMax) {
                        choices.push(spans[i]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        choices.push(spans[j]);
                        // if length of array choices is 2, if statement should cause a break.
                        if (choices.length === 2) {
                            console.log("breaking", choices.length);
                            break loopOne;
                        }
                    }
                    //  else statement takes all the spans in the row of the current i and should check if the ???
                    else {
                        let allY = document.querySelectorAll(`[data-y="${coordinatesYZero}"]`);
                        let neighborsXSum = 0;
                        // For loop takes ???
                        for (let i = coordinatesXMin + 1; i < coordinatesXMax; i++) {
                            neighborsXSum += Number(allY[i].innerHTML);
                        }
                        if (neighborsXSum === 0) {
                            console.log(spans[i], spans[j], "can be removed");
                            spans[i].classList.add("hint");
                            spans[j].classList.add("hint");
                            choices.push(spans[i]);
                            choices.push(spans[j]);
                            if (choices.length === 2) {
                                console.log("breaking");
                                break loopOne;
                            }
                        }
                        // else {
                        //     console.log(spans[i], spans[j], "cannot be removed");
                        // }
                    }
                    // Else if statement checks if i and j are in the same column.
                } else if (coordinatesXZero === coordinatesXOne) {
                    // if statement checks if i and j are neighbors by a row, if yes, they are pushed into choices array.
                    if (coordinatesYMin + 1 === coordinatesYMax) {
                        console.log(spans[i], spans[j], "can be removed");
                        choices.push(spans[i]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        choices.push(spans[j]);
                        if (choices.length === 2) {
                            console.log("breaking");
                            break loopOne;
                        }
                        // Else statement takes all numbers in the column of i and checks if 
                    } else {
                        let allX = document.querySelectorAll(`[data-x="${coordinatesXZero}"]`);
                        let neighborsYSum = 0;
                        for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
                            neighborsYSum += Number(allX[i].innerHTML);
                        }
                        if (neighborsYSum === 0) {
                            console.log(spans[i], spans[j], "can be removed");
                            choices.push(spans[i]);
                            spans[i].classList.add("hint");
                            spans[j].classList.add("hint");
                            choices.push(spans[j]);
                            if (choices.length === 2) {
                                console.log("breaking");
                                break loopOne;
                            }
                        }
                        else {
                            console.log(spans[i], spans[j], "cannot be removed, thins one?");
                        }
                    }
                    // Else if statement takes the 
                } else if (placeYMin !== placeYMax) {
                    let allPlaces = document.querySelectorAll(`[data-place]`);
                    let betweenSpanSum = 0;
                    for (let i = placeYMin + 1; i < placeYMax; i++) {
                        betweenSpanSum += Number(allPlaces[i].innerHTML);
                    }
                    if (betweenSpanSum === 0) {
                        console.log(spans[i], spans[j], "can be removed");
                        choices.push(spans[i]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        choices.push(spans[j]);
                        console.log("neighborsXSum === 0");
                        if (choices.length === 2) {
                            console.log("breaking");
                            break loopOne;
                        }
                    }
                }
                // else {
                //     generateButton.classList.add("hint");
                //     console.log("generate button should get a class", generateButton.classList);
                // }

            }
        }
        // if (choices.length === 2) {
        //     console.log("breaking");
        //     choices = [];
        //     return;
        // }
    }
    if (choices.length === 2) {
        console.log("breaking");
        choices = [];
    } else {
        generateButton.classList.add("hint");
        // console.log("generate button should get a class", generateButton.classList);
    }
    // choices = [];
}


/** 
 * Removes a pair if all conditions are met.
*/
function removeViablePair() {
    undoButton.classList.remove("hide");
    memory = [];
    memory = gameTable.cloneNode(true);
    // let memoryChildren = memory.getElementsByTagName("span");
    // console.log(memoryChildren, "memory length")
    // for (let x = 0; x < memoryChildren.length; x++) {
    //     if (memoryChildren[x].style.backgroundColor = "yellow") {
    //         memoryChildren[x].style.backgroundColor = "";
    //     }
    // }
    score += 2;
    choices[0].textContent = "0";
    choices[0].style.backgroundColor = "black";
    // choices[0].removeEventListener("click", function () { }); // Redundant because of playGame
    choices[1].textContent = "0";
    choices[1].style.backgroundColor = "black";
    // choices[1].removeEventListener("click", function () { }); // Redundant because of playGame
    removeEmptyRow();
    let currentSpans = gameTable.getElementsByTagName("span");
    for (let i = 0; i < currentSpans.length; i++) {
        if (currentSpans[i].classList.contains("hint")) {
            currentSpans[i].classList.remove("hint");
        }
    }
    calculateScore();
    gameWon();
    playGame();
}

let score = 0;

/**
 * Function updates gameScore inner HTML with the current score.
 */
function calculateScore() {
    gameScore.innerHTML = score;
    /**
     * Highlight is removed from generateButton if present.
     */
    if (generateButton.classList.contains("hint")) {
        generateButton.classList.remove("hint");
    }
    /**
     * If statement shows Remove Fifth button if score is above 50.
     * Else statement hides Remove Fifth button if score is less than 50.
     */
    if (score >= 50) {
        if (removeFifthButton.classList.contains("hide")) {
            removeFifthButton.classList.remove("hide");
        }
    } else {
        if (!removeFifthButton.classList.contains("hide")) {
            removeFifthButton.classList.add("hide");
        }
    }
}


/**
 * Function removes 1/5 of the current score when the removeFifthButton is used.
 * If score cannot be divided by 5, Math.ceil is used for the score to remain an integer.
 * 
 */

let newScore = 0;

/**
 * Function removes 1/5 of score and spans once Remove Fifth button is used.
 * 
 */
function removeFifth() {
    /**
     * Removes 1/5 of the score.
     * If the score cannot be divided by 5, this is done to user's benefit.
     */
    newScore = Math.ceil((score / 5) * 4);
    score = newScore;
    calculateScore();
    /**
     * If statement removes a hint class from generate Button if present. 
     */
    // if (generateButton.classList.contains("hint")) {
    //     generateButton.classList.remove("hint");
    // }
    /**
     * Undo button is removed to prevent gaming.
     */
    undoButton.classList.add("hide");
    const spans = gameTable.getElementsByTagName("span");
    const spansLength = spans.length;
    /**
     * For loop removes every 5th span starting from the end.
     */
    for (let i = spansLength; i > 0; i--) {
        if (i % 5 === 0) {
            gameTable.removeChild(spans[i - 1]);
        }
    }
    /**
     * Span location is calculated again.
     */
    addLocation();
}

/**
 * Function checks if all present spans are empty (0).
 * Once all spans are empty, pop-up is generated, notifying player.
 * Pop up includes the final score.
 * Upon closing of the pop-up, user is brought to the initial game menu.
 */
function gameWon() {
    const spans = gameTable.getElementsByTagName("span");
    let sum = 0;
    /** 
     * For loop checks if all present spans equal to 0.
     */
    for (let i = 0; i < spans.length; i++) {
        sum += Number(spans[i].innerHTML);
    }
    /** If statement creates an alert if the game is won. 
     * It shows the final score.
     * It hides the current session and shows initial menu.
     */
    if (sum === 0) {
        alert(`You won! Your final score is ${score}`);
        initialMenu.style.display = "block";
        game.style.display = "none";
    }
}