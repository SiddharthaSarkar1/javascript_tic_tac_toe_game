//Selecting all the required elements

const selectBox = document.querySelector(".select-box"),
    SelectXBtn = selectBox.querySelector(".playerX"),
    SelectOBtn = selectBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { //Once the window loaded
    for (let i = 0; i < allBox.length; i++) { //Added onclick attribute in all available sections's span
        allBox[i].setAttribute("onclick", "clickedBox(this)")
    }
    SelectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //Hide the select box when playerX button is clicked
        playBoard.classList.add("show"); //Show the playboard when playerX button is clicked
    }
    SelectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //Hide the select box when playerO button is clicked
        playBoard.classList.add("show"); //Show the playboard when playerO button is clicked
        players.setAttribute("class", "players active player");
    }
};

let playerXIcon = "fas fa-times"; //Class name of fontawesome cross icon
let playerOIcon = "far fa-circle";  //Class name of fontawesome circle icon
let playerSign = "X";//Suppose player will be X
let runBot = true;

//User click function
function clickedBox(element) {
    //console.log(element);
    if (players.classList.contains("player")) {  //if players element contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
        //If player selects O then we will set the player sign to O
        playerSign = "O";  //If player will be O, then we will change the sign
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //Calling the winner function
    playBoard.style.pointerEvents = "none"; //Once user selected a box then user can select any other box until bol selects
    element.style.pointerEvents = "none"; //Once user select a box the the box can't be selected again
    let randomDelayTime = ((Math.random() * 1000) + 2000).toFixed();  //generating time delay so that the bot will delay randomly to select box
    //console.log(randomDelayTime);
    setTimeout(() => {
        bot(runBot);  //Calling bot function
    }, randomDelayTime); //Passing random delay time
}

// Box click function
function bot(runBot) {
    if (runBot) {  //If runBot ids true then only run the following codes
        playerSign = "O";
        let array = []; //Creating an empty array, where we will store unselected box index
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //If span has no children element
                array.push(i); //inserting unclicked or unselected boxes inside the array means that span has no children
                //console.log(i + " " + "has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //Getting random index fromarray so that the bot can select a random box
        //console.log(randomBox);
        if (array.length > 0) {
            if (players.classList.contains("player")) {  //if players element contains .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //Calling the winner function
            allBox[randomBox].style.pointerEvents = "none";  //Once bot select any box then user cant select or click on that box 
            playBoard.style.pointerEvents = "auto";
            playerSign = "X"; //Passing the x value
        }
        //console.log(array);
    }
}

//Lets work on selecting the winners
function getClass(idName) {
    return document.querySelector(".box" + idName).id; //returning the id
}

function checkClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {  //If one of the combination matches then select the winner
    if (checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 6, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {
        console.log(playerSign + " is the winner.");
        //Once the match is won by someone then stop the bot
        runBot = false;
        bot(runBot);

        setTimeout(() => {  //we will delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //700 milisecond delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        //If the match is draw
        //first we will check all id, if all span has id and no one won the game then we will draw the game
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);

            setTimeout(() => {  //we will delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); //700 milisecond delay

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //Reload the currnt page
}