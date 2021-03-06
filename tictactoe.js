'use strict';

function easy(board) {
    let move = [undefined, undefined];
    let freeSquares = [];
    let done = false;

    // Determine which squares are free
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                freeSquares.push([i, j]);
            }
        }
    }

    while (done != true) {
        move[0] = Math.floor(Math.random() * 3);
        move[1] = Math.floor(Math.random() * 3);

        for (let free of freeSquares) {
            if (free[0] == move[0] && free[1] == move[1]) {
                done = true;
            }
        }
    }
    makeMove(board, move);
}

function hard(board) {
    let move = [undefined, undefined];
    let block = false;
    let win = false;
    let block_coordinates = [undefined, undefined];
    let win_coordinates = [undefined, undefined];
    let usedSquares = [];

    // The AI is 'o'

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 'x' || board[i][j] == 'o') {
                usedSquares.push([i, j]);
            }
        }
    }

    if (usedSquares.length == 1 && usedSquares[0][0] == 0 && usedSquares[0][1] == 0) {
        move[0] = 1;
        move[1] = 1;
    }
    else if (usedSquares.length == 1 && usedSquares[0][0] == 0 && usedSquares[0][1] == 2) {
        move[0] = 1;
        move[1] = 1;
    }
    else if (usedSquares.length == 1 && usedSquares[0][0] == 2 && usedSquares[0][1] == 0) {
        move[0] = 1;
        move[1] = 1;
    }
    else if (usedSquares.length == 1 && usedSquares[0][0] == 2 && usedSquares[0][1] == 2) {
        move[0] = 1;
        move[1] = 1;
    }
    else {
        // Check if the AI can win
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == 'o' && board[i][1] == 'o' && board[i][2] == '') {
                win = true;
                win_coordinates[0] = i;
                win_coordinates[1] = 2;
                break;
            }
            else if (board[i][0] == 'o' && board[i][1] == '' && board[i][2] == 'o') {
                win = true;
                win_coordinates[0] = i;
                win_coordinates[1] = 1;
                break;
            }
            else if (board[i][0] == '' && board[i][1] == 'o' && board[i][2] == 'o') {
                win = true;
                win_coordinates[0] = i;
                win_coordinates[1] = 0;
                break;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] == 'o' && board[1][i] == 'o' && board[2][i] == '') {
                win = true;
                win_coordinates[0] = 2;
                win_coordinates[1] = i;
                break;
            }
            else if (board[0][i] == 'o' && board[1][i] == '' && board[2][i] == 'o') {
                win = true;
                win_coordinates[0] = 1;
                win_coordinates[1] = i;
                break;
            }
            else if (board[0][i] == '' && board[1][i] == 'o' && board[2][i] == 'o') {
                win = true;
                win_coordinates[0] = 0;
                win_coordinates[1] = i;
                break;
            }
        }
        // Check vertical rows
        if (board[0][0] == 'o' && board[1][1] == 'o' && board[2][2] == '') {
            win = true;
            win_coordinates[0] = 2;
            win_coordinates[1] = 2;
        }
        else if (board[0][0] == 'o' && board[1][1] == '' && board[2][2] == 'o') {
            win = true;
            win_coordinates[0] = 1;
            win_coordinates[1] = 1;
        }
        else if (board[0][0] == '' && board[1][1] == 'o' && board[2][2] == 'o') {
            win = true;
            win_coordinates[0] = 0;
            win_coordinates[1] = 0;
        }
        else if (board[0][2] == 'o' && board[1][1] == 'o' && board[2][0] == '') {
            win = true;
            win_coordinates[0] = 2;
            win_coordinates[1] = 0;
        }
        else if (board[0][2] == 'o' && board[1][1] == '' && board[2][0] == 'o') {
            win = true;
            win_coordinates[0] = 1;
            win_coordinates[1] = 1;
        }
        else if (board[0][2] == '' && board[1][1] == 'o' && board[2][0] == 'o') {
            win = true;
            win_coordinates[0] = 0;
            win_coordinates[1] = 2;
        }

        if (win) {
            move[0] = win_coordinates[0];
            move[1] = win_coordinates[1];
        }
        else {
            // Check if the oponent needs to be blocked
            // Check rows
            for (let i = 0; i < 3; i++) {
                if (board[i][0] == 'x' && board[i][1] == 'x' && board[i][2] == '') {
                    block = true;
                    block_coordinates[0] = i;
                    block_coordinates[1] = 2;
                    break;
                }
                else if (board[i][0] == 'x' && board[i][1] == '' && board[i][2] == 'x') {
                    block = true;
                    block_coordinates[0] = i;
                    block_coordinates[1] = 1;
                    break;
                }
                else if (board[i][0] == '' && board[i][1] == 'x' && board[i][2] == 'x') {
                    block = true;
                    block_coordinates[0] = i;
                    block_coordinates[1] = 0;
                    break;
                }
            }
            // Check columns
            for (let i = 0; i < 3; i++) {
                if (board[0][i] == 'x' && board[1][i] == 'x' && board[2][i] == '') {
                    block = true;
                    block_coordinates[0] = 2;
                    block_coordinates[1] = i;
                    break;
                }
                else if (board[0][i] == 'x' && board[1][i] == '' && board[2][i] == 'x') {
                    block = true;
                    block_coordinates[0] = 1;
                    block_coordinates[1] = i;
                    break;
                }
                else if (board[0][i] == '' && board[1][i] == 'x' && board[2][i] == 'x') {
                    block = true;
                    block_coordinates[0] = 0;
                    block_coordinates[1] = i;
                    break;
                }
            }
            // Check vertical rows
            if (board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == '') {
                block = true;
                block_coordinates[0] = 2;
                block_coordinates[1] = 2;
            }
            else if (board[0][0] == 'x' && board[1][1] == '' && board[2][2] == 'x') {
                block = true;
                block_coordinates[0] = 1;
                block_coordinates[1] = 1;
            }
            else if (board[0][0] == '' && board[1][1] == 'x' && board[2][2] == 'x') {
                block = true;
                block_coordinates[0] = 0;
                block_coordinates[1] = 0;
            }
            else if (board[0][2] == 'x' && board[1][1] == 'x' && board[2][0] == '') {
                block = true;
                block_coordinates[0] = 2;
                block_coordinates[1] = 0;
            }
            else if (board[0][2] == 'x' && board[1][1] == '' && board[2][0] == 'x') {
                block = true;
                block_coordinates[0] = 1;
                block_coordinates[1] = 1;
            }
            else if (board[0][2] == '' && board[1][1] == 'x' && board[2][0] == 'x') {
                block = true;
                block_coordinates[0] = 0;
                block_coordinates[1] = 2;
            }

            if (block) {
                move[0] = block_coordinates[0];
                move[1] = block_coordinates[1];
            }
            else {
                // The AI:s move will be in one of the corners if possible
                // Check for free corners
                if (board[0][0] == '') {
                    move[0] = 0;
                    move[1] = 0;
                }
                else if (board[0][2] == '') {
                    move[0] = 0;
                    move[1] = 2;
                }
                else if (board[2][0] == '') {
                    move[0] = 2;
                    move[1] = 0;
                }
                else if (board[2][2] == '') {
                    move[0] = 2;
                    move[1] = 2;
                }
                // Check if the middle square is free if no corner is free
                else if (board[1][1] == '') {
                    move[0] = 1;
                    move[1] = 1;
                }
                else {
                    move = easy(board);
                }
            }
        }
    }
    makeMove(board, move);
}

// Easy every other time and hard every other time
function medium(board) {
    let move = [undefined, undefined];

    if (board[3][1] == "easy") {
        move = easy(board);
        board[3][1] = "hard";
    }
    else if (board[3][1] == "hard") {
        move = hard(board);
        board[3][1] = "easy";
    }
    else {
        console.log("medium() function error: can not decide between easy or hard");
    }
}

function makeMove(board, move) {
    board[move[0]][move[1]] = 'o';
    drawBoard(board);
}

// The AI needs to know what difficulty the player selected in order to make a move
function decideMoveDependingOnDifficulty(board) {
    if (board[3][0] == "easy") {
        easy(board);
    }
    else if (board[3][0] == "medium") {
        medium(board);
    }
    else if (board[3][0] == "hard") {
        hard(board);
    }
    else {
        console.log("decideLevel() function error: can not decide difficulty")
    }
    drawBoard(board);
    playerInfo.movesMade++;
    checkForWin(board);
    playerInfo.playerAllowed = true;
}

function getPlayerInfo() {
    let selectedRadioButton = document.getElementsByName("difficulty");
    playerInfo.playerName = document.getElementsByName("name")[0].value;
    for (let i = 0; i < 3; i++) {
        if (selectedRadioButton[i].checked) {
            playerInfo.difficulty = selectedRadioButton[i].value;
            board[3][0] = selectedRadioButton[i].value;
        }
    }
    sessionStorage.setItem("playerInfo", JSON.stringify(playerInfo));
    sessionStorage.setItem("board", JSON.stringify(board));
    window.location.replace("./game.html");
}

// Check if the player or the AI won
function checkForWin(board) {
    let win = [];
    let players = ['x', 'o'];
    let foundX = false;
    let foundO = false;
    outer: for (let player of players) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win.push(player);
                break outer;
            }
            else if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win.push(player);
                break outer;
            }
            else if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win.push(player);
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win.push(player);
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win.push(player);
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win.push(player);
                break outer;
            }
        }
        if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win.push(player);
            break outer;
        }
        else if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win.push(player);
            break outer;
        }
        else if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win.push(player);
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win.push(player);
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win.push(player);
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win.push(player);
            break outer;
        }
    }
    for (let player of win) {
        if (player == 'x') {
            foundX = true;
        }
        else if (player == 'o') {
            foundO = true;
        }
    }

    if (foundX && foundO) {
        playerInfo.movesMade = 9;
        playerInfo.ties++;
        document.getElementById("score-text").innerHTML = "Tie"
    }
    else if (foundX) {
        document.getElementById("score-text").innerHTML = "You Win"
        playerInfo.movesMade = 9;
        playerInfo.wins++;
    }
    else if (foundO) {
        document.getElementById("score-text").innerHTML = "You Loose"
        playerInfo.movesMade = 9;
        playerInfo.losses++;
    }
    else if (playerInfo.movesMade == 9 && !foundX && !foundO) {
        document.getElementById("score-text").innerHTML = "Tie"
        playerInfo.movesMade = 9;
        playerInfo.ties++;
    }

    document.getElementById("win").innerHTML = playerInfo.wins;
    document.getElementById("draw").innerHTML = playerInfo.ties;
    document.getElementById("loss").innerHTML = playerInfo.losses;
}

// Runs every time the page loads
// Tries to get info from sessionStorage
// If nothing is saved in sessionStorage: reset everything original values
function onload() {
    try {
        playerInfo = JSON.parse(sessionStorage.getItem("playerInfo"));
        board = JSON.parse(sessionStorage.getItem("board"));
        document.getElementById("difficulty").innerHTML = playerInfo.difficulty;
        document.getElementById("name").innerHTML = playerInfo.playerName;
        document.getElementById("win").innerHTML = playerInfo.wins;
        document.getElementById("draw").innerHTML = playerInfo.ties;
        document.getElementById("loss").innerHTML = playerInfo.losses;
    }
    catch(e) {
        console.log("onload function error");
        console.log(e);
        if (playerInfo == null) {
            playerInfo = {playerName:"", wins:0, losses:0, ties:0, difficulty:"", movesMade:0, playerAllowed:true};
        }
        if (board == null) {
            board = [['', '', ''],
                     ['', '', ''],
                     ['', '', ''], ["", "easy"]];
        }
    }
}

// Draws the player move on the board
function drawBoard(board) {
    document.getElementById("square1").innerHTML = board[0][0].toUpperCase();
    document.getElementById("square2").innerHTML = board[0][1].toUpperCase();
    document.getElementById("square3").innerHTML = board[0][2].toUpperCase();
    document.getElementById("square4").innerHTML = board[1][0].toUpperCase();
    document.getElementById("square5").innerHTML = board[1][1].toUpperCase();
    document.getElementById("square6").innerHTML = board[1][2].toUpperCase();
    document.getElementById("square7").innerHTML = board[2][0].toUpperCase();
    document.getElementById("square8").innerHTML = board[2][1].toUpperCase();
    document.getElementById("square9").innerHTML = board[2][2].toUpperCase();
}

// Checks if the player is allowed to make the move
// This function is run every time the player presses a square on the board
function playerMove(squareId) {
    let freeSquares = [];
    let move = [undefined, undefined];
    let isFree = false;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                freeSquares.push([i, j]);
            }
        }
    }
    switch (squareId) {
        case 1:
            move[0] = 0;
            move[1] = 0;
            break;
        case 2:
            move[0] = 0;
            move[1] = 1;
            break;
        case 3:
            move[0] = 0;
            move[1] = 2;
            break;
        case 4:
            move[0] = 1;
            move[1] = 0;
            break;
        case 5:
            move[0] = 1;
            move[1] = 1;
            break;
        case 6:
            move[0] = 1;
            move[1] = 2;
            break;
        case 7:
            move[0] = 2;
            move[1] = 0;
            break;
        case 8:
            move[0] = 2;
            move[1] = 1;
            break;
        case 9:
            move[0] = 2;
            move[1] = 2;
            break;
        default:
            console.log("playerMove() function error");
            break;
    }
    for (let free of freeSquares) {
        if (free[0] == move[0] && free[1] == move[1]) {
            isFree = true;
        }
    }
    if (isFree && playerInfo.movesMade < 9 && playerInfo.playerAllowed) {
        board[move[0]][move[1]] = 'x';
        playerInfo.movesMade++;
        drawBoard(board);
        checkForWin(board);
        playerInfo.playerAllowed = false;
        if (playerInfo.movesMade < 9) {
            // The AI needs to wait a short while (1 sec) before it makes a move
            timeout = setTimeout(decideMoveDependingOnDifficulty, 1000, board);
        }
    }
    else {
        console.log("Player can not make this move");
        console.log(playerInfo.playerAllowed);
    }
}

// Reset the board and check if the player changed difficulty
function restart() {
    let selectedRadioButton = document.getElementsByName("difficulty");
    board = [['', '', ''],
             ['', '', ''],
             ['', '', ''], ["", "easy"]];
    board[3][0] = playerInfo.difficulty;
    playerInfo.movesMade = 0;
    // If the AI is qued to make a move: stop the AI from making that move
    clearTimeout(timeout);
    for (let i = 0; i < 3; i++) {
        if (selectedRadioButton[i].checked) {
            playerInfo.difficulty = selectedRadioButton[i].value;
            board[3][0] = selectedRadioButton[i].value;
        }
    }
    playerInfo.playerAllowed = true;
    document.getElementById("score-text").innerHTML = "..."
    document.getElementById("difficulty").innerHTML = playerInfo.difficulty;
    drawBoard(board);
}

//Function for swich webpage to index.html
function goHome(){
    window.location.replace("./index.html")
}

let playerInfo = {playerName:"", wins:0, losses:0, ties:0, difficulty:"", movesMade:0, playerAllowed:true};
let timeout;
let board = [['', '', ''],
             ['', '', ''],
             ['', '', ''], ["", "easy"]];