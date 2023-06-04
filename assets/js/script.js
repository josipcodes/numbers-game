// DOM related variables - buttons
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

// DOM related variables
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
let generateButtonInstance = 0;
let score = 0;
let newScore = 0;
let memory = [];
let choices = [];

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
    button.addEventListener("click", runGame);
  });

// Ensures item is an array and uses forEach to add event listener.
[...returnButtons].forEach(button => {
    button.addEventListener("click", returnToMenu);
  });

// Ensures item is an array and uses forEach to add event listener.
[...soundIcons].forEach(button => {
    button.addEventListener("click", soundOptions);
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

function showGame() {
    // Shows initial menu, toggles or hides related pages and buttons.
    initialMenu.classList.add("hide");
    continueGameButton.classList.add("hide");
    quitGameButton.classList.add("hide");
    undoButton.classList.add("hidden");
    gamePage.classList.toggle("hide");
    difficultyMenu.classList.toggle("hide");
    generateButton.classList.remove("hint");
}

/**
 * Creates sufficient amount of spans based on the difficulty chosen.
 * If user closes a previous session by clicking on a new game, deletes previous spans and generates new game.
 * MVP: Current state. Future potential - each difficulty level could generate a random amount of spans (15-25, 25-50, 50-100)
 */
function runGame() {
    showGame();
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
    // If user chooses intermediate level, 45 spans are created.
    if (this.id === "intermediate") {
        for (let i = 0; i < 45; i++) {
            let newSpan = document.createElement("span");
            gameTable.appendChild(newSpan);
        }
    } 
    // If user chooses expert level, 45 spans are created.
    else if (this.id === "expert") {
        for (let i = 0; i < 70; i++) {
            let newSpan = document.createElement("span");
            // newSpan.textContent = "";
            gameTable.appendChild(newSpan);
        }
    } 
    // 20 spans are created and appended if higher difficulty level wasn't chosen.
    else {
        for (let i = 0; i < 20; i++) {
            let newSpan = document.createElement("span");
            gameTable.appendChild(newSpan);
        }
    }
    // Randomizer is called to set innerHTML of spans.
    randomizer();
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
     * c) data-place is the general location of the span.
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

/**
 * Creates event listeners for all spans created. 
 * Ideally it would only create listeners for spans which don't have a class of 'removed-choice' however this results in click event jumping to the closest present span.
 */
function addListenerToSpan() {
    let spans = gameTable.getElementsByTagName("span");
    Array.from(spans).forEach(span => {
        span.addEventListener("click", highlight);
      });
    // Ensures score is calculated when needed.
    calculateScore();
}

/**
 * Hightlights the chosen span pairs and calls for the check of choice.
 * If user clicks on the same span twice, choice is disregarded.
 */
function highlight() {
    // Added to attempt combating event listener jumping to a nearby span, doesn't work elsewhere
    if (!this.classList.contains("removed-choice")) { 
        this.classList.add("choice");
        // Ensures sound isn't played if user clicks on a removed span
        if (!soundOn.classList.contains("hide")) {
            playSound();
        }
    }
    // Each choice is pushed into an array.
    choices.push(this);
    // If user clicks on the same span twice, choice is cancelled, otherwise we proceed to check the location of the two choices.
    if (choices[0] === choices[1]) {
        cancelChoice();
    } else if (choices.length === 2) {
        checkLocation(choices);
        choices = [];
    }
}

/**
 * Checks location of the choices by x and y coordinates as well as placement.
 * Proceeds to cancelChoice if choice is not valid, or to check content if choice is deemed valid
 */
function checkLocation(choices) {
    // Variables containing the locations of the two choices
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
    // If statement checks if both choices have the same Y coordinate
    if (coordinatesYZero === coordinatesYOne) {
        // If statement checks if the two choices are neighbors by X coordinate.
        if (coordinatesXMin + 1 === coordinatesXMax) {
            checkContent();
        } 
        // Else statement calculates the sum of all spans between the two choices if they are not neighbors.
        else {
            let allY = document.querySelectorAll(`[data-y="${coordinatesYZero}"]`);
            let neighborsXSum = 0;
            for (let i = coordinatesXMin + 1; i < coordinatesXMax; i++) {
                neighborsXSum += Number(allY[i].innerHTML);
            }
            // If sum of spans in between is 0, we proceed to check the content of the two choices, otherwise cancel the choices.
            if (neighborsXSum === 0) {
                checkContent();
            } else {
                cancelChoice();
            }
        }
    } 
    // Else if checks if the two choices have the same X coordinate.
    else if (coordinatesXZero === coordinatesXOne) {
        // If statement checks if the two choices are neighbors by Y.
        if (coordinatesYMin + 1 === coordinatesYMax) {
            checkContent();
        } 
        // Else statement calculates the sum of spans in between if the two choices are not neighbors.
        else {
            let allX = document.querySelectorAll(`[data-x="${coordinatesXZero}"]`);
            let neighborsYSum = 0;
            for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
                neighborsYSum += Number(allX[i].innerHTML);
            }
            // If sum of spans in between is 0, we proceed to check the content of the two choices, otherwise cancel the choices.
            if (neighborsYSum === 0) {
                checkContent();
            } else {
                cancelChoice();
            }
        }
    } 
    // Else if checks the sum of spans in between the two choices if they are not on the same X or Y coordinate.
    else if (placeYMin !== placeYMax) {
        let allPlaces = document.querySelectorAll(`[data-place]`);
        let betweenSpanSum = 0;
        for (let i = placeYMin + 1; i < placeYMax; i++) {
            betweenSpanSum += Number(allPlaces[i].innerHTML);
        }
        // If sum of spans in between is 0, we proceed to check the content of the two choices, otherwise cancel the choices.
        if (betweenSpanSum === 0) {
            checkContent();
        } else {
            cancelChoice();
        }
    } 
    // All other cases result in canceling a choice.
    else {
        cancelChoice();
    }
}

/**
 * Checks content of spans to decide if action is valid based on the innerHTML.
 */
function checkContent() {
    // setting sum to the sum of the two choices
    let sum = parseInt(choices[0].innerHTML) + parseInt(choices[1].innerHTML);
    /**
     * If sum of spans is 10 or their innerHTML is equal and greater than 0, pair is removed, otherwise cancelled.
     * This fixes issue where user could remove previously removed pair, which triggered score calculation and undo button visibility.
     */
    if (sum === 10 || (choices[0].innerHTML === choices[1].innerHTML && sum > 0)) {
        removeViablePair();
    } else {
        cancelChoice();
    }
}

// Cancels choice if pair is not viable, empties choices array, sets sum to 0.
function cancelChoice(choices) {
    choices = [];
    // Removes highlight or hints if present
        removeHint();
        removeHighlight();
    // sum = 0;
}

// Checks for and removes an empty row
function removeEmptyRow() {
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
                span.remove();
            });
        }
    }
    addLocation();
}

// Opens main menu
function pauseGame() {
    returnToMenu();
    continueGameButton.classList.toggle("hide");
    quitGameButton.classList.toggle("hide");
}

// Brings user back into the game
function continueGame() {
    initialMenu.classList.toggle("hide");
    gamePage.classList.toggle("hide");
    continueGameButton.classList.toggle("hide");
    quitGameButton.classList.toggle("hide");
}

/** 
 * Generates new spans after the user presses 'generate'.
 * This is done by only taking into account spans on the board which don't have inner.HTML = 0.
*/
function generateMoreSpans() {
    let spans = gameTable.getElementsByTagName("span");
    let spansLength = spans.length;
    let generateSpans = [];
    // Calculates the amount of time generateButton was pressed without any other actions taking place.
    generateButtonInstance += 1;
    // Checks if generateButtonInstance is too high.
    gamePotentiallyNotSolvable();
    // Removes hints and highlights if present.
    removeHint();
    removeHighlight();
    // disables undo button to prevent gaming.
    if (!undoButton.classList.contains("hidden")) {
        undoButtonToggle();
    }
    // For loop checks spans and pushes spans of value  into generateSpans array.
    for (let i = 0; i < spansLength; i++) {
        if (!spans[i].classList.contains("removed-choice")) {
            generateSpans.push(spans[i]);
        }
    }
    // For loop appends new spans and sets their innerHTML to copy the value of those initially present on the table.
    for (let i = 0; i < generateSpans.length; i++) {
        let newSpan = document.createElement("span");
        newSpan.textContent = generateSpans[i].innerHTML;
        gameTable.appendChild(newSpan);
    }
    // Location is calculated to scope newly generated spans.
    addLocation();
}

// Outside of MVP, deletes the last action by returning the previous state from the memory.
function undoAction() {
    // Variable obtains the memorised span preserved within memory variable.
    let memoryChildren = memory.getElementsByTagName("span");
    // Checks score, if sets score to 0 if less than 5, else removes 5 points.
    if (score <= 5) {
        score = 0;
    } else {
        score -= 5;
    }
    // Hides undoButton as memory only stores the previous instance.
    undoButtonToggle();
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
    // updates gameTable with the new state
    gameTable = document.getElementById("game-table");
    // Adds event listeners.
    addListenerToSpan();
}

/** 
 * Outside of MVP, provides a hint, but costs 3 points.
 * Function is set up to check all spans within row, column and across multiple rows.
*/
function provideHint() {
    let spans = gameTable.getElementsByTagName("span");
    let hintOptions = [];
    let startOfCheck = 0;
    // Score calculation
    if (score >= 3) {
        score -= 3;
    } else {
        score = 0;
    }
    calculateScore();
    // Loop searches for a span with a class of hint. Loop breaks at that point.
    for (let x = 0; x < spans.length; x++) {
        if (spans[x].classList.contains("hint")) {
            startOfCheck = spans[x].getAttribute("data-place");
            break;
        }
    }
    // Removing hints and highlights
    removeHint();
    removeHighlight();
    centralLoop:
    /**
     * Loop starts from startOfCheck (or 0) - this enables user to go through multiple hints instead of only having one.
     * Max i is second to last span - as further functions check for hints going down and going to the right.
     */
    for (let i = startOfCheck; i < spans.length - 2; i++) {
      /** 
       * Loop runs as many times as there are spans on the board, counting from the current i + 1.
       * Bug observed where a positive vertical find in the first column causes j to become 01, likely because of addLocation().
       * Manifestation: positive vertical find remains stuck and is the only hint available.
       * Fix implemented by breaking a loop when this happens.
       * Remaining minor issue - function can overlook a vertical find if there is a horizontal one starting with the same span.
    */ 
        for (let j = i + 1; j < spans.length; j++) {
        	if (j === "01") {
                break;
            }
            // Variables collecting numerical value of the 2 spans being checked.
            let spanIValue = Number(spans[i].innerHTML);
            let spanJValue = Number(spans[j].innerHTML);
            // Variables collecting Y and X coordinates of the first span checked.
            let coordinatesYZero = Number(spans[i].getAttribute("data-y"));
            let coordinatesXZero = Number(spans[i].getAttribute("data-x"));
            // Variables collecting Y and X coordinates of the second span checked.
            let coordinatesYOne = Number(spans[j].getAttribute("data-y"));
            let coordinatesXOne = Number(spans[j].getAttribute("data-x"));
            // Variables collecting location of the two spans checked.
            let placeYZero = Number(spans[i].getAttribute("data-place"));
            let placeYOne = Number(spans[j].getAttribute("data-place"));
            // Variables setting the max and min value of the Y placement of the two spans.
            let placeYMin = Math.min(placeYZero, placeYOne);
            let placeYMax = Math.max(placeYZero, placeYOne);
            // Variables collecting min and max of both Y and X coordinated of the two spans.
            let coordinatesYMin = Math.min(coordinatesYZero, coordinatesYOne);
            let coordinatesYMax = Math.max(coordinatesYZero, coordinatesYOne);
            let coordinatesXMin = Math.min(coordinatesXZero, coordinatesXOne);
            let coordinatesXMax = Math.max(coordinatesXZero, coordinatesXOne);
            // setting sum value to the sum of the two spans
            let sum = spanIValue + spanJValue;
            // If statement checks inner HTML of i and j as long as the current i's inner HTML isn't 0 (previously removed item).
            if ((spanIValue === spanJValue || sum === 10) && spanIValue !== 0) {
                // if statement checks if both i and j are in the same row.
                if (coordinatesYZero === coordinatesYOne) {
                    // if statement checks if i and j are touching in a column (x). If yes, i and j are pushed into choices array.
                    if (coordinatesXMin + 1 === coordinatesXMax) {
                        hintOptions.push(spans[i]);
                        hintOptions.push(spans[j]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        // if length of array choices is 2, centralLoop is broken.
                        if (hintOptions.length === 2) {
                            break centralLoop;
                        }
                    }
                    // Else statement takes all the spans in the row of the current i and checks the sum of the spans between coordinatesXMin and Max.
                    else {
                        let allY = document.querySelectorAll(`[data-y="${coordinatesYZero}"]`);
                        let neighborsXSum = 0;
                        // For loop adds the innerHTML of the spans in between.
                        for (let i = coordinatesXMin + 1; i < coordinatesXMax; i++) {
                            neighborsXSum += Number(allY[i].innerHTML);
                        }
                        // If the sum of spans in between is 0, hint has been located.
                        if (neighborsXSum === 0) {
                            spans[i].classList.add("hint");
                            spans[j].classList.add("hint");
                            hintOptions.push(spans[i]);
                            hintOptions.push(spans[j]);
                            // if length of array choices is 2, centralLoop is broken.
                            if (hintOptions.length === 2) {
                                break centralLoop;
                            }
                        }
                    }
                    // Else if statement checks if i and j are in the same column.
                } else if (coordinatesXZero === coordinatesXOne) {
                    // If statement checks if i and j are neighbors by a row - if yes, they are pushed into choices array.
                    if (coordinatesYMin + 1 === coordinatesYMax) {
                        hintOptions.push(spans[i]);
                        hintOptions.push(spans[j]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        // if length of array choices is 2, centralLoop is broken.
                        if (hintOptions.length === 2) {
                            break centralLoop;
                        }
                    // Else statement takes all the numbers in the column of the current i and checks the sum of the spans between coordinatesYMin and Max.
                    } else {
                        let allX = document.querySelectorAll(`[data-x="${coordinatesXZero}"]`);
                        let neighborsYSum = 0;
                        // For loop adds the innerHTML of the spans in between.
                        for (let i = coordinatesYMin + 1; i < coordinatesYMax; i++) {
                            neighborsYSum += Number(allX[i].innerHTML);
                        }
                        // If the sum of spans in between is 0, hint has been located.
                        if (neighborsYSum === 0) {
                            hintOptions.push(spans[i]);
                            hintOptions.push(spans[j]);
                            spans[i].classList.add("hint");
                            spans[j].classList.add("hint");
                            // if length of array choices is 2, centralLoop is broken.
                            if (hintOptions.length === 2) {
                                break centralLoop;
                            }
                        }
                    }
                // Else if statement takes the two spans which are not in the same row
                } else if (placeYMin !== placeYMax) {
                    let allPlaces = document.querySelectorAll(`[data-place]`);
                    let betweenSpanSum = 0;
                    // For loop adds the innerHTML of the spans in between.
                    for (let i = placeYMin + 1; i < placeYMax; i++) {
                        betweenSpanSum += Number(allPlaces[i].innerHTML);
                    }
                    // If the sum of spans in between is 0, hint has been located.
                    if (betweenSpanSum === 0) {
                        hintOptions.push(spans[i]);
                        hintOptions.push(spans[j]);
                        spans[i].classList.add("hint");
                        spans[j].classList.add("hint");
                        // If length of array choices is 2, centralLoop is broken.
                        if (hintOptions.length === 2) {
                            break centralLoop;
                        }
                    }
                }
            }
        }
    }
    // If there are no hints to be provided on the spans, generateButton receives a 'hint' class.
    if (hintOptions.length === 0) {
        generateButton.classList.add("hint");
    }
}

// Removes a pair if all conditions are met.
function removeViablePair() {
    // Sets generateButtonInstance to 0 to prevent gamePotentiallyNotSolvable from triggering alert.
    generateButtonInstance = 0;
    // Cloning gameTable to remember the last choice.
    memory = gameTable.cloneNode(true);
    // Increases score.
    score += 2;
    // Class and innerHTML are updated.
    choices[0].classList.add("removed-choice");
    choices[1].classList.add("removed-choice");
    choices[0].textContent = "";
    choices[1].textContent = "";
    // Shows undo button after a successful removal.
    if (undoButton.classList.contains("hidden")) {
        undoButtonToggle();
    }
    // Checks if there are empty rows.
    removeEmptyRow();
    // Checks if spans are highlighted and removes highlight.
    removeHint();
    // Checks if game is won.
    isGameWonCheck();
}

// Function updates gameScore inner HTML with the current score.
function calculateScore() {
    gameScore.innerHTML = score;
    // Check added to ensure removeFifth button is visible/hidden depending on the score.
    FifthButtonDisplay();
}

/**
 * Function removes 1/5 of the current score when the removeFifthButton is used.
 * If score cannot be divided by 5, Math.ceil is used for the score to remain an integer.
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
    // Undo button is removed to prevent gaming.
    if (!undoButton.classList.contains("hidden")) {
        undoButtonToggle();
    }
    // For loop removes every 5th span starting from the end.
    for (let i = spansLength; i > 0; i--) {
        if (i % 5 === 0) {
            gameTable.removeChild(spans[i - 1]);
        }
    }
    // Check if game was won by removing spans.
    isGameWonCheck();
    // Span location is calculated again.
    addLocation();
    // Check if there are empty rows to be removed.
    removeEmptyRow();
    // Removing hints and highlights if present as hints would likely be invalid.
    removeHint();
    removeHighlight();
}

// Checks if generate button or any spans are highlighted, removes highlight.
function removeHint() {
    const spans = gameTable.getElementsByTagName("span");
    if (generateButton.classList.contains("hint")) {
        generateButton.classList.remove("hint");
    } else {
    let filteredHints = Array.from(spans).filter(span => span.classList.contains("hint"));
    Array.from(filteredHints).forEach(filteredHint => filteredHint.classList.remove("hint"));
    }
}

/**
 * Function checks if all present spans are empty (0).
 * Once all spans are empty, pop-up is generated, notifying the user.
 * Pop up includes the final score.
 * Upon closing of the pop-up, user is brought to the initial game menu.
 */
function isGameWonCheck() {
    const spans = gameTable.getElementsByTagName("span");
    let sum = 0;
    /**
     * For loop checks if all present spans equal to 0.
     * If check added to prevent unnecessary running of the loop - it will only run when there is one row left.
     */
    if (spans.length <= 9) {
        for (let i = 0; i < spans.length; i++) {
            sum += Number(spans[i].innerHTML);
        }
    /** If statement creates an alert if the game is won. 
     * It shows the final score.
     * It hides the current session and shows initial menu.
     */
        if (sum === 0) {
            alert(`You won! Your final score is ${score}`);
            quitGameAction();
        }
    }
}

/**
 * Function hides removeFifthButton when conditions are met. 
 * It shows the button if second set of conditions is met.
 */
function FifthButtonDisplay() {
    let spans = gameTable.getElementsByTagName("span");
    /** If statement hides removeFifthButton if: 
     * a) there are less than or equal to 5 spans on the table.
     * a.1) bug fix - without '=', button remains visible if there are 4 spans on the board
     * b) score is below 50.
    */
    if (spans.length <= 5 || score < 50 && !removeFifthButton.classList.contains("hidden")) {
        removeFifthButton.classList.toggle("hidden");
    }
    /**
     * Else if statement shows removeFifthButton if: 
     * a) there are more than 4 spans on the table,
     * b) score is at least 50,
     * c) removeFifthButton was previously hidden.
     */
     else if (spans.length > 4 && score >= 50 && removeFifthButton.classList.contains("hidden")) {
        removeFifthButton.classList.toggle("hidden");
    }
}

/** 
 * Function brings up a pop up asking user to confirm if they want to quit the game. 
 * Cancel closes the pop-up without further action.
 */
function quitGame() {
    /** 
     * Pop up will ask user for confirmation of quitting the game: 
     * function will transition to quitGameAction if needed.
     */
    let quitConfirm = confirm("Are you sure you want to quit?");
    if (quitConfirm === true) {
        quitGameAction();
    }
}

// Function returns user to the main menu, hides continue/quit game buttons as the session is done.
function quitGameAction() {
    returnToMenu();
    continueGameButton.classList.add("hide");
    quitGameButton.classList.add("hide");
}

/**
 * Function checks if user uses Generate button several times without removing any viable pairs in between.
 * This is designed to warn the user at certain intervals to: 
 * a) prevent game exploitation,
 * b) recognise potential for player genuinely being stuck, while not impacting their experience.
 */
function gamePotentiallyNotSolvable() {
    /**
     * If statement checks the generateButtonInstance which is increased whenever the user repeatedly presses Generate.
     * If generateButtonInstance reaches 4, alert pops up and the game moves to its paused state.
     */
    if (generateButtonInstance === 4) {
        alert("You have used 'Generate' several times in a row. Feel free to start a new game if this one is no longer solvable. Good luck!");
        generateButtonInstance = 0;
        pauseGame();
    }
}

/**
 * Function plays sound when called. 
 * Current play time is set to 0 to help with repeated/quick actions. 
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
 * Event listener creation was loosely inspired by JavaScript30 website - JavaScript Drum Kit tutorial.
 */
document.addEventListener("keyup", function(event) {
    if (event.code === "KeyC" && !continueGameButton.classList.contains("hide")) {
        continueGame();
    } 
    if (!gamePage.classList.contains("hide")) {
        if (event.code === "KeyG") {
            generateMoreSpans();
        } else if (event.code === "KeyH") {
            provideHint();
        } else if (event.code === "KeyP") {
            pauseGame();
        } else if (event.code === "KeyR" && !removeFifthButton.classList.contains("hidden")) {
            removeFifth();
        } else if (event.code === "KeyM") {
            soundOptions();
        }
    }
});
  
/**
* Function checks for a class of soundOn div and toggles visibility between it and soundOff.
* Sound will play when user clicks on the icon which enables sound to confirm the user's action.
*/
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

// Removes a highlight if another action takes place.
function removeHighlight() {
    let spans = gameTable.getElementsByTagName("span");
    let filteredChoices = Array.from(spans).filter(span => span.classList.contains("choice"));
    Array.from(filteredChoices).forEach(filteredChoice => filteredChoice.classList.remove("choice"));
    // Empties choices to prevent user having to make unnecessary click
    choices = [];
}