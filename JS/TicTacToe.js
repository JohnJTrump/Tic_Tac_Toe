//-----------------------------------------------------------------------
//          JavaScript for Tic Tac Toe
//-----------------------------------------------------------------------

let activePlayer = 'X'; //This variable keeps track of whose turn it is.

let selectedSquares =[]; //This array stores an array of moves. We use this to determine win conditions.

function placeXOrO(squareNumber) { //This function is for placing an X or O in a square.
    if(!selectedSquares.some(element => element.includes(squareNumber))) { //This condition ensures a square hasnt been selected already.
        let select = document.getElementById(squareNumber);                  //The .some() method is used to check each element of selectedSquare array
        if (activePlayer === 'X') {                                           //to see if it contains the square number clicked on.
            select.style.backgroundImage = 'url("images/New_X.png")'; //If activePlayer is equal to 'X', the x.png is placed in HTML.
        } 
        else {
            select.style.backgroundImage = 'url("images/New_O.png")'; //If activePlayer is equal to 'O'. the o.png is placed in HTML.
        }
        selectedSquares.push(squareNumber + activePlayer); //squareNumber and activePlayer are concatenated together and added to array.
        checkWinConditions(); //This calls a function to check for any win conditions.
            if (activePlayer === 'X') { //This condition is for changing the active player.
                activePlayer = 'O'; //If active player is 'X' change it to 'O'.
            }
            else { //If active player is anything other that 'X'.
                activePlayer = 'X'; //Change the activePlayer to 'X'
            }
    }     
    audio('./media/positive_tone.mp3'); //This function plays placement sound.
        if(activePlayer === 'o') { //This condition checks to see if it is computers turn.
            disableClick(); //This function disables clicking for computer choice.
            setTimeout(function () { computersTurn(); }, 1000); //This function waits 1 second before placing the image and enabling click.
        }   
        return true; //Returning true is needed for our computersTurn() function to work.
}

function computersTurn() { //This function results in a random square being selected.
    let success = false; //This boolean is needed for our while loop.
    let pickASquare; //This variable stores a random number 0-8
    while(!success) { //This condition allows our while loop to keep trying is a square is selected already.
        pickASquare = String(Math.floor(Math.random() * 9));
        if (placeXOrO(pickASquare)){
            placeXOrO(pickASquare); //This line calls the function.
            success = true; //This changes our boolean and ends the loop.
        };
    }
}


//This function parses the selectedSquares array to search for win conditions.
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); } // X O, 1, 2 condition.
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); } // X 3, 4, 5 condition.
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); } // X 6, 7, 8 condition.
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); } // X 0, 3, 6 condition.
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); } // X 1, 4, 7 condition.
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); } // X 2, 5, 8 condition.
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); } // X 6, 4, 2 condition.
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); } // X 0, 4, 8 condition.
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); } // O 0, 1, 2 condition.
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); } // O 3, 4, 5 condition.
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); } // O 6, 7, 8 condition.
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); } // O 0, 3, 6 condition.
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); } // O 1, 4, 7 condition.
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); } // O 2, 5, 8 condition.
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); } // O 6, 4, 2 condition.
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); } // O 0, 4, 8 condition.
    else if (selectedSquares.length >= 9) {             //This condition checks for tie. If none of the above conditions regester
        audio('./media/NoWin.mp3'); //<-tie game sound.      //and 9 squares are selected, the code executes.
        setTimeout(function () { resetGame(); }, 1000); //This function sets a .3second timer before the resetGame is called.
    }


    function arrayIncludes(squareA, squareB, squareC) { //This function checks if an array includes 3 strings. Its used to check for each win condition.
        const a = selectedSquares.includes(squareA); //The next 3 variables will be used to check for 3 in a row.
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);                                               
        if (a === true && b === true && c === true) { return true; } //If the 3 variables we pass all included in out array true is
    }                                                                //returned and our else if condition executes the drawWinLine function.}
}

function disableClick() { //This function makes our body element temporarily unclickable.
    body.style.pointerEvents = 'none'; //This makes our body unclickable.
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000); //This makes our body clickable again after 1second.
}

function audio(audioURL) { //This function takes a string parameter of the path you set earlier for placement sound ('./media/place.mp3')
    let audio = new Audio(audioURL); //We create a new audio object and we pass the path as a parameter.
    audio.play(); //Play method plays our audio sound.
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) { //This function utilizes html canvas to draw win lines.
    const canvas = document.getElementById('win-lines'); //This line accesses our html canvas element.
    const c = canvas.getContext('2d'); //This line gives us access to methods and properties to use on canvas.
    let x1 = coordX1, //This line indicates where the start of a lines x axis is.
        y1 = coordY1, //This line indicates where the start of a lines y axis is.
        x2 = coordX2, //This line indicates where the end of a lines axis is.
        y2 = coordY2, //This line indicates where the end of a lines x axis is.
        x = x1, //This variable stores temporary x axis data we update in out animation loop.
        y = y1; //This variable stores temporary y axis data we update in our animation loop.


    function animateLineDrawing() { //This function interacts with the canvas.
        const animationLoop = requestAnimationFrame(animateLineDrawing); //This varuable creates the loop when the game ends it restarts.
        c.clearRect(0, 0, 608, 608); //This method clears content from last loop iteration.
        c.beginPath(); //This method starts a new path.
        c.moveTo(x1, y1);  //This method moves us to a starting point for our line.
        c.lineTo(x, y); //This method indicates the end point in our line.
        c.lineWidth = 10; //This method sets the width of our line.
        c.strokeStyle = 'rgba(70, 255, 33, .8)'; //This methos sets the color of our line.
        c.stroke(); //This method draws everything we laid out above.
        if (x1 <= x2 && y1 <= y2) { //This condition checks if we've reached the endpoint.
            if (x < x2) { x += 10; } //This condition adds 10 to the previous end x point.
            if (y < y2) { y += 10; } //This condition adds 10 to the previous end y point.
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); } //This condition cancels our animation loop if end is reached.
        }
        if (x1 <= x2 && y1 >= y2) { //This condition is similar to the one above: It was necessary for the 6, 4, 2 win condition.
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }


    function clear() { //This function clears our canvas after our win line is drawn.
        const animationLoop = requestAnimationFrame(clear); //This line stats our animation loop.
        c.clearRect(0, 0, 608, 608);  //This line clears our canvas.
        cancelAnimationFrame(animationLoop); //This line stops our animation loop.
        }    
    disableClick(); //This line disallows clicking while the win sound is playing.
    audio('./media/GameWin.mp3'); //This line plays the win sounds.
    animateLineDrawing(); //This line calls our main animation loop.
    setTimeout(function () { clear(); resetGame(); }, 1000); //This line waits 1second then clears canvas, resets game, and allows clicking again.
}

function resetGame() { //This function resets the game in a tie or a win.
    for (let i = 0; i < 9; i++) { //This for loop iterates through each HTML square element.
        let square = document.getElementById(String(i));  //This variable gets html element of i.
        square.style.backgroundImage = ''; //This removes our elements backgroundImage.
    }
    selectedSquares = [];
}