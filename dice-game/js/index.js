let dices = document.querySelectorAll(".dice");
let container = document.querySelector(".wrap");
let button = document.querySelector("#button");

let createRandomRoll = () => {
    let randomRoll = Math.ceil(Math.random() * 6);
    return randomRoll;
};

let createRandomPosition = () => {
    let randomPos = Math.ceil(Math.random() * 5);
    return randomPos;
};

let displayPlayerNames = () => {
    let playerNames = document.querySelectorAll("h3");
    for (let i = 0; i < playerNames.length; i++) {
        playerNames[i].classList.toggle("undisplayed");
    }
};

let throwDices = () => {
    displayPlayerNames();
    let dice1 = createRandomRoll();
    let dice2 = createRandomRoll();
    let pos1 = createRandomPosition();
    let pos2 = createRandomPosition();
    if (dice1 === dice2) {
        let clonedDice = dices[dice1 - 1].cloneNode(true);
        clonedDice.classList.add("cloned");
        container.appendChild(clonedDice);
        clonedDice.classList.remove("undisplayed");
        dices[dice2 - 1].classList.remove("undisplayed");
    } else {
        let newDice1 = dices[dice1 - 1].cloneNode(true);
        let newDice2 = dices[dice2 - 1].cloneNode(true);
        if (dice1 > dice2) {
            newDice1.classList.add("greater");
        } else {
            newDice2.classList.add("greater");
        }
        newDice1.classList.add("cloned");
        newDice2.classList.add("cloned");
        if (pos1 > pos2) {
            newDice1.classList.add("pos2");
            newDice2.classList.add("pos1");
            container.insertBefore(newDice1, container.children[pos2]);
            container.insertBefore(newDice2, container.children[pos1]);
        }
        if (pos2 > pos1) {
            newDice1.classList.add("pos1");
            newDice2.classList.add("pos2");
            container.insertBefore(newDice1, container.children[pos1]);
            container.insertBefore(newDice2, container.children[pos2]);
        }
        if (pos1 === pos2) {
            newDice1.classList.add("pos1");
            newDice2.classList.add("pos2");
            container.insertBefore(newDice1, container.children[pos1]);
            container.insertBefore(newDice2, container.children[pos2]);
        }
        newDice1.classList.remove("undisplayed");
        newDice2.classList.remove("undisplayed");
    }
    displayWinner(pos1, pos2, dice1, dice2);
};

let reset = () => {
    let container = document.querySelector(".wrap");
    let dices = document.querySelectorAll(".dice");
    for (var i = 0; i < dices.length; i++) {
        if (dices[i].classList.contains("cloned")) {
            container.removeChild(dices[i]);
        }
    }
    for (let i = 0; i < dices.length; i++) {
        if (!dices[i].classList.contains("undisplayed")) {
            dices[i].classList.add("undisplayed");
        }
    }
    let playerNames = document.querySelectorAll("h3");
    for (let i = 0; i < playerNames.length; i++) {
        playerNames[i].classList.add("undisplayed");
    }
    document.querySelector(".result").innerHTML = "";
}

let displayWinner = (pos1, pos2, roll1, roll2) => {
    let result = document.querySelector(".result");
    if (roll1 === roll2) {
        result.innerHTML = "Draw!";
    } else {
        if (pos1 > pos2) {
            let leftDice = document.querySelector(".pos2");
            let rightDice = document.querySelector(".pos1");
            if (leftDice.classList.contains("greater")) {
                result.innerHTML = "Player 1 Wins!";
            }
            if (rightDice.classList.contains("greater")) {
                result.innerHTML = "Player 2 Wins!";
            }
        }
        if (pos2 > pos1) {
            let leftDice = document.querySelector(".pos1");
            let rightDice = document.querySelector(".pos2");
            if (leftDice.classList.contains("greater")) {
                result.innerHTML = "Player 1 Wins!";
            }
            if (rightDice.classList.contains("greater")) {
                result.innerHTML = "Player 2 Wins!";
            }
        }
        if (pos1 === pos2) {
            let leftDice = document.querySelector(".pos2");
            let rightDice = document.querySelector(".pos1");
            if (leftDice.classList.contains("greater")) {
                result.innerHTML = "Player 1 Wins!";
            }
            if (rightDice.classList.contains("greater")) {
                result.innerHTML = "Player 2 Wins!";
            }
        }
    }
    result.classList.remove("undisplayed");
};

let decideAction = () => {
    let status = true;
    if (status) {
        reset();
        throwDices();
    }
};