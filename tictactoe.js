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
            console.log("Win move")
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
                console.log("Block move")
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
                    console.log("Can not find any")
                    move = easy(board);
                }
                console.log("Corner move")
            }
        }
    }
    console.log(move);
    makeMove(board, move);
}

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
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
    localStorage.setItem("board", JSON.stringify(board));
    window.location.replace("./game.html");
    console.log(playerInfo.playerName);
    console.log(board[3][0]);
}

function checkForWin(board) {
    let win = undefined;
    let players = ['x', 'o'];
    outer: for (player of players) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win = player;
                break outer;
            }
            else if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win = player;
                break outer;
            }
            else if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
                win = player;
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win = player;
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win = player;
                break outer;
            }
            else if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
                win = player;
                break outer;
            }
        }
        if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win = player;
            break outer;
        }
        else if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win = player;
            break outer;
        }
        else if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            win = player;
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win = player;
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win = player;
            break outer;
        }
        else if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            win = player;
            break outer;
        }
    }

    if (win == 'o') {
        playerInfo.losses++;
    }
    else if (win = 'x') {
        playerInfo.wins++;
    }
    else {
        playerInfo.ties++;
    }

    document.getElementById("win").innerHTML = playerInfo.wins;
    document.getElementById("draw").innerHTML = playerInfo.ties;
    document.getElementById("loss").innerHTML = playerInfo.losses;

    return win;
}

function onload() {
    try {
        playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
        board = JSON.parse(localStorage.getItem("board"));
        document.getElementById("difficulty").innerText = playerInfo.difficulty;
        document.getElementById("name").innerHTML = playerInfo.playerName;
        document.getElementById("win").innerHTML = playerInfo.wins;
        document.getElementById("draw").innerHTML = playerInfo.ties;
        document.getElementById("loss").innerHTML = playerInfo.losses;
    }
    catch(e) {
        console.log("onload function error");
        console.log(e);
        if (playerInfo == null) {
            playerInfo = {playerName:"", wins:2, losses:0, ties:0, difficulty:""};
        }
        if (board == null) {
            board = [['', '', ''],
                     ['', '', ''],
                     ['', '', ''], ["", "easy"]];
        }
    }
}

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
        case 1:
            move[0] = 2;
            move[1] = 0;
            break;
        case 1:
            move[0] = 2;
            move[1] = 1;
            break;
        case 1:
            move[0] = 2;
            move[1] = 2;
            break;
        default:
            console.log("playerMove() funciton error");
            break;
    }
    for (let free of freeSquares) {
        if (free[0] == move[0] && free[1] == move[1]) {
            isFree = true;
        }
    }
    if (isFree) {
        board[move[0]][move[1]] = 'x';
        drawBoard(board);
    }
    else {
        console.log("Player can not make this move");
    }
}

function restart(board) {
    board = [['', '', ''],
             ['', '', ''],
             ['', '', ''], ["", "easy"]];
    board[3][0] = playerInfo.difficulty;
}

let playerInfo = {playerName:"", wins:2, losses:0, ties:0, difficulty:""};

let board = [['', '', ''],
             ['', '', ''],
             ['', '', ''], ["", "easy"]];

onload();