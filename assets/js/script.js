document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "new-game") {
                ADDFUNCTIONHERE();
            } else if ((this.getAttribute("data-type") === "rules") {
                ADDFUNCTIONHERE();
            } else if ((this.getAttribute("data-type") === "about") {
                ADDFUNCTIONHERE();
            } else if ((this.getAttribute("data-type") === "controls") {
                ADDFUNCTIONHERE();
            }
        }
        });