//Selecting all the required elements

const selectBox = document.querySelector(".select-box"),
SelectXBtn = selectBox.querySelector(".playerX"),
SelectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players");

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

//User click function
function clickedBox(element){
    //console.log(element);
    if(players.classList.contains("player")){  //if players element contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
    }
    element.style.pointerEvents = "none"; //Once user select a box the the box can't be selected again
}