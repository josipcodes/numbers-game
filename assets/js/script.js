// DOM related variables
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

let initialMenu = document.getElementById("initial-menu");
let difficultyMenu = document.getElementById("difficulty-menu");
let rulesPage = document.getElementById("rules-page");
let aboutPage = document.getElementById("about-page");
let controlsPage = document.getElementById("controls-page");
let gamePage = document.getElementById("game-container");
let gameTable = document.getElementById("game-table");
let gameScore = document.getElementById("score");
let flex = document.getElementById("flex");
let sound = document.getElementById("sound");
let soundIcons = document.getElementsByClassName("fa-solid");
let soundOn = document.getElementById("sound-is-on");
let soundOff = document.getElementById("sound-is-off");

// Event listeners

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
quitGameButton.addEventListener("click", quitGame);

// Ensures item is an array and uses forEach to add event listener.
  [...gameModeButtons].forEach(button => {
    button.addEventListener("click", runGame)
  });

// Ensures item is an array and uses forEach to add event listener.
[...returnButtons].forEach(button => {
    button.addEventListener("click", returnToMenu)
  });

// Ensures item is an array and uses forEach to add event listener.
[...soundIcons].forEach(button => {
    button.addEventListener("click", soundOptions)
  });

// Opens difficulty page
function showDifficultyPage() {
    initialMenu.classList.toggle("hide");
    difficultyMenu.classList.toggle("hide");
}

// Opens rules page
function showRulesPage() {
    initialMenu.classList.toggle("hide");
    rulesPage.classList.toggle("hide");
}


// Opens about page
function showAboutPage() {
    initialMenu.classList.toggle("hide");
    aboutPage.classList.toggle("hide");
}


// Opens controls page

function showControlsPage() {
    initialMenu.classList.toggle("hide");
    controlsPage.classList.toggle("hide");
}


// Opens main menu

function returnToMenu() {
    initialMenu.classList.remove("hide");
    difficultyMenu.classList.add("hide");
    rulesPage.classList.add("hide");
    aboutPage.classList.add("hide");
    controlsPage.classList.add("hide");
    gamePage.classList.add("hide");
}

/**
 * Creates sufficient amount of spans based on the difficulty chosen.
 * If user closes a previous session by clicking on a new game, deletes previous spans and generates new game.
 * MVP: Current state. Future potential - each difficulty level could generate a random amount of spans (15-25, 25-50, 50-100)
 */
function runGame() {
    // Checks if gamePage contains show class, if not, adds it and removes hide.
    initialMenu.classList.add("hide");
    continueGameButton.classList.add("hide");
    quitGameButton.classList.add("hide");
    undoButton.classList.add("hidden");
    gamePage.classList.toggle("hide");
    difficultyMenu.classList.toggle("hide");
    // Sets score to 0 to prevent score carrying over from a previous session.
    score = 0;
    // Sets innerHTML to score.
    calculateScore();
    const spans = gameTable.getElementsByTagName("span");
    const spansLength = spans.length;
    // Removes previous spans if they exist.
    if (spans.length !== 0) {
        for (let i = 0; i < spansLength; i++) {
            gameTable.removeChild(spans[0]);
        }
    }
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
            gameTable.appendChild(newSpan);
        }
    }
    randomizer();
    addListenerToSpan();
}

// Creates random numbers (1-9) and adds them into relevant span elements
function randomizer() {
    // Obtains the list of spans
    let spans = gameTable.getElementsByTagName("span");
    // Adds random (1-9) number to each existing span.
    for (let i = 0; i < spans.length; i++) {
        let randomNumber = Math.floor(Math.random() * 9 + 1);
        // sets innerText to said random number
        spans[i].innerText = randomNumber;
    }
    // Adds location to existing spans.
    addLocation();
}

/**
 * Creates span coordinates starting from 0,0. 
 * Current issue if X>9 resolved by splitting the string by a period.
 * Y captured using .charAt
 */
function addLocation() {
    // Obtains the list of spans
    let spans = gameTable.getElementsByTagName("span");
    /**
     * For each existing span:
     * a) sets y by taking digits before the period when dividing i with 9.
     * b) sets x by taking the first digit after the period. Undefined is set to 0.
     * c) data-place is the general location of the span (0-current length).
     */
    for (let i = 0; i < spans.length; i++) {
        let stringCoordinateCalc = String(i / 9).split(".");
        if (stringCoordinateCalc[1] === undefined) {
            stringCoordinateCalc[1] = "0";
        }
        spans[i].setAttribute(["data-y"], `${stringCoordinateCalc[0]}`);
        spans[i].setAttribute(["data-x"], `${stringCoordinateCalc[1].charAt(0)}`);
        spans[i].setAttribute(["data-place"], `${i}`);
    }
    
    // Adds event listeners to current spans.
    addListenerToSpan();
}


// Creates event listeners for all spans created. Ideally will only create listeners for spans which don't have a value of 0
function addListenerToSpan() {
    let choice = gameTable.getElementsByTagName("span");
    typeof(choice);
    Array.from(choice).forEach(span => {
        span.addEventListener("click", highlight)
      });
    // 
    calculateScore();
}

let sum = 0;
let choices = [];

/**
 * Hightlights the chosen span pairs and calls for the check of choice.
 * If user clicks on the same span twice, choice is disregarded.
 */
function highlight() {
    if (!this.classList.contains("removed-choice")) { // Added to attempt combating event listener jumping to a nearby span, doesn't work elsewhere
        this.classList.add("choice");
        if (!soundOn.classList.contains("hide")) {
        playSound();
    }
        choices.push(this);
        if (choices[0] === choices[1]) {
            cancelChoice();
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
 * Checks content of spans to decide if action is valid.
 */
function checkContent() {
    let sum = 0;
    sum = parseInt(choices[0].innerHTML) + parseInt(choices[1].innerHTML);
    // If sum of spans is 10 or their innerHTML is equal, pair is removed, otherwise cancelled.
    if (sum === 10 || (choices[0].innerHTML === choices[1].innerHTML)) {
        removeViablePair();
    } else {
        cancelChoice();
    }
}

// Cancels choice if pair is not viable
function cancelChoice() {
    choices = [];
    let spans = gameTable.getElementsByTagName("span");
    // Checks if any of the spans are highlighted and removes highlight
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].classList.contains("hint") || spans[i].classList.contains("choice")) {
            spans[i].classList.remove("hint");
            spans[i].classList.remove("choice");
        }
        sum = 0;
    }
}

// Checks for and removes an empty row
function removeEmptyRow() {
    typeof(wholeRow)
    let amountOfSpans = document.querySelectorAll("[data-place]").length;
    // Calculates the amount of rows that need checking. Doesn't check the last row if not full.
    for (let i = 0; i < (Math.floor(amountOfSpans / 9)); i++) {
        let collection = 0;
        let wholeRow = document.querySelectorAll(`[data-y="${i}"]`);
        // Checks all spans within the row and sums their innerHTML.
        for (let j = 0; j < 9; j++) {
            collection += Number(wholeRow[j].innerHTML);
        }
        // If row sum is 0, calculates score and removes the row.
        if (collection === 0) {
            score += 10;
            calculateScore();
            let emptyRow = document.querySelectorAll(`[data-y="${i}"]`);
            Array.prototype.forEach.call(emptyRow, span => {
                span.remove()
                console.log("removing a row")
              });
            }
        }
        addLocation();
    }

/** 
 * Opens main menu
*/
function pauseGame() {
    returnToMenu();
    continueGameButton.classList.toggle("hide");
    quitGameButton.classList.toggle("hide");
    // initialMenu.classList.remove("hide");
}

/** 
 * Brings user back into the game
*/
function continueGame() {
    initialMenu.classList.toggle("hide");
    gamePage.classList.toggle("hide");
    continueGameButton.classList.toggle("hide");
    quitGameButton.classList.toggle("hide");
}

let generateSpans = [];

/** 
 * Generates new spans after the user presses "generate".
 * This is done by only taking into account spans on the board which don't have inner.HTML = 0.
*/
function generateMoreSpans() {
    generateScore += 1;
    gamePotentiallyNotSolvable();
    if (!undoButton.classList.contains("hidden")) {
    undoButtonToggle();
    }
    let spans = gameTable.getElementsByTagName("span");
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
        if (!spans[i].classList.contains("removed-choice")) {
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
 * Outside of MVP, removes the last action.
 * Removes 5 points if the score is at least 5, otherwise sets score to 0.
*/

let memory = [];

function undoAction() {
    // Checks score, if sets score to 0 if less than 5, else removes 5 points.
    if (score <= 5) {
        score = 0;
    } else {
        score -= 5;
    }
    // hides undoButton
    undoButtonToggle();
    let memoryChildren = memory.getElementsByTagName("span");
    // Removes highlight from spans.
    for (let x = 0; x < memoryChildren.length; x++) {
        if (memoryChildren[x].classList.contains("choice")) {
            memoryChildren[x].classList.remove("choice");
        }
    }
    // removes current spans.
    gameTable.remove();
    // appends spans saved in memory (previous action)
    flex.appendChild(memory);
    // empties memory
    memory = [];
    // updates gameTable with the new state
    gameTable = document.getElementById("game-table");
    // Adds event listeners.
    addListenerToSpan();
}

/** 
 * Outside of MVP, provides a hint, but costs 5 points.
 * Current unexpected behaviour - generate button triggers after the last pair is hinted, not removing after a cycle.
*/
function provideHint() {
    if (score >= 3) {
        score -= 3;
    } else {
        score = 0;
    }
    calculateScore();
    generateButton.classList.remove("hint");
    let spans = gameTable.getElementsByTagName("span");
    let choices = [];
    // Loop runs as many times as there are spans on the board, minus one as there is no need to check the last span.
    let startOfCheck = 0;
    for (let x = 0; x < spans.length; x++) {
        if (spans[x].classList.contains("hint")) {
            startOfCheck = spans[x].getAttribute("data-place");
            break;
        }
    }
    for (let y = 0; y < spans.length; y++) {
        if (spans[y].classList.contains("hint")) {
            spans[y].classList.remove("hint");
        }
    }

    loopOne:
    for (let i = startOfCheck; i < spans.length - 2; i++) {
      /** 
       * Loop runs as many times as there are spans on the board, counting from the current i + 1.
       * Bug observer where a positive vertical find in the first column causes j to become 01.
       * Manifestation: positive vertical find remains stuck and is the only hint available.
       * Fix implemented by breaking a loop when this happens.
       * Remaining minor issue - function can overlook a vertical find in the first row if there is a horizontal one.
    */ 
        for (let j = i + 1; j < spans.length; j++) {
        	if (j === "01") {
                break;
            }
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
            }
        }
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
    // Sets generateScore to 0 to prevent gamePotentiallyNotSolvable from triggering alert.
    generateScore = 0;
    // Shows undo button after a successful removal.
    if (undoButton.classList.contains("hidden")) {
    undoButtonToggle();
    }
    memory = [];
    // Clones gameTable to remember the last choice.
    memory = gameTable.cloneNode(true);
    // Increases score.
    score += 2;
    choices[0].classList.add("removed-choice");
    choices[1].classList.add("removed-choice");
    choices[0].textContent = "";
    choices[1].textContent = "";
    // Checks if there are empty rows.
    removeEmptyRow();
    // Checks if spans are highlighted and removes highlight.
    let currentSpans = gameTable.getElementsByTagName("span");
    for (let i = 0; i < currentSpans.length; i++) {
        if (currentSpans[i].classList.contains("hint")) {
            currentSpans[i].classList.remove("hint");
        }
    }
    // Checks if game is won.
    gameWon();
}

let score = 0;


// Function updates gameScore inner HTML with the current score.
function calculateScore() {
    gameScore.innerHTML = score;
    FifthButtonDisplay();
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
    const spans = gameTable.getElementsByTagName("span");
    const spansLength = spans.length;
    /**
     * Removes 1/5 of the score.
     * If the score cannot be divided by 5, this is done to user's benefit.
     */
    newScore = Math.ceil((score / 5) * 4);
    score = newScore;
    calculateScore();
    /**
     * Undo button is removed to prevent gaming.
     */
    if (!undoButton.classList.contains("hidden")) {
    undoButtonToggle();
    }
    /**
     * For loop removes every 5th span starting from the end.
     */
    for (let i = spansLength; i > 0; i--) {
        if (i % 5 === 0) {
            gameTable.removeChild(spans[i - 1]);
        }
    }
    /**
     * Check if game was won by removing spans.
     */
    gameWon();
    /**
     * Span location is calculated again.
     */
    addLocation();
    /**
    * Check if there are empty rows to be removed.
    */
    removeEmptyRow();
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
        quitGame();
        // initialMenu.classList.toggle("hide");
        // gamePage.classList.toggle("hide");
        // continueGameButton.classList.add("hide");
    }
}

/**
 * Function hides removeFifthButton when conditions are met. 
 * It shows the button if second set of conditions are met.
 */
function FifthButtonDisplay() {
    let currentSpans = gameTable.getElementsByTagName("span");
    /** If statement hides removeFifthButton if: 
     * a) there are less than 5 spans on the table.
     * b) score is below 50.
    */
    if (currentSpans.length < 5 || score < 50 && !removeFifthButton.classList.contains("hidden")) {
        removeFifthButton.classList.toggle("hidden");
    }
    /**
     * Else if statement shows removeFifthButton if: 
     * a) there are more than 4 spans on the table,
     * b) score is at least 50,
     * c) removeFifthButton was previously hidden.
     */
    else if (currentSpans.length > 4 && score >= 50 && removeFifthButton.classList.contains("hidden")) {
        removeFifthButton.classList.toggle("hidden");
    }
}

// Function brings up the main menu and hides continue and quit options.
function quitGame() {
    returnToMenu();
    continueGameButton.classList.add("hide");
    quitGameButton.classList.add("hide");
}

let generateScore = 0;

/**
 * Function checks if user uses Generate button several times without removing any viable pairs in between.
 * This is designed to warn the user at certain intervals to: 
 * a) prevent game exploitation,
 * b) recognise potential for player genuinely being stuck, while not impact their experience.
 */
function gamePotentiallyNotSolvable() {
    /**
     * If statement check the generateScore which is increased whenever the user repeatedly presses Generate.
     * If generateScore reaches 5, alert pops up and the game moves to its paused state.
     */
    if (generateScore === 4) {
        alert("You have used 'Generate' several times in a row. Feel free to start a new game if this one is no longer solvable. Good luck!");
        generateScore = 0;
        pauseGame();
        // initialMenu.classList.toggle("hide");
    }
}

/**
 * Function plays sound when called. 
 * Current play time is set to 0 to help with repeated actions. 
 */
function playSound() {
    const audio = document.getElementsByTagName("audio")[0];
    // Below line of code was obtained from JavaScript30 website - JavaScript Drum Kit tutorial.
    audio.currentTime = 0;
    sound.play();
}

/**
 * Function observers a keydown event.
 * If C is pressed while continueGameButton is showing, used will be taken into the game.
 * If G is pressed, generateMoreSpans function runs.
 * If H is pressed, provideHint function runs.
 * If P is pressed, pauseGame function runs.
 * If R is pressed, removeFifth function runs.
 * If M is pressed, soundOptions function runs.
 * Minor bug: when in main menu after pausing the game, user can press H, R or G. 
 * Corresponding action will take place and user will be brought into the gamePage. Unable to locate source of gamePage class change.
 * Event listener creation was loosely taken from JavaScript30 website - JavaScript Drum Kit tutorial.
 */
document.addEventListener("keyup", function(event) {
        if (event.code = "KeyC" && !continueGameButton.classList.contains("hide")) {
            continueGame();
        } 
        if (!gamePage.classList.contains("hide")) {
            if (event.code === "KeyG") {
                generateMoreSpans();
            } else if (event.code === "KeyH") {
                provideHint();
            } else if (event.code === "KeyP") {
                pauseGame();
                // initialMenu.classList.toggle("hide");
            } else if (event.code === "KeyR" && !removeFifthButton.classList.contains("hidden")) {
                removeFifth();
            } else if (event.code === "KeyM") {
                soundOptions();
            }
        }
  });
  
// Function checks for a class of soundOn div and toggles visibility between it and soundOff.
  function soundOptions() {
    soundOn.classList.toggle("hide");
    soundOff.classList.toggle("hide");
    if (!soundOn.classList.contains("hide")) {
        playSound();
    }
}

// Toggles undoButton class of hide when called
function undoButtonToggle() {
    undoButton.classList.toggle("hidden");
}