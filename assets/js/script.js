let newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", chooseDifficulty);

function chooseDifficulty(event) {
    let gameContent = document.getElementsByClassName("game-window").innerHtml;

    gameContent = `<h1>Numbers Game</h1>
    <h2>Difficulty Level</h2>
    <button type="button" class="new-game-screen-button" data-type="beginner">Beginner</button>
    <button type="button" class="new-game-screen-button" data-type="intermediate">Intermediate</button>
    <button type="button" class="new-game-screen-button" data-type="expert">Expert</button>
    `;
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




