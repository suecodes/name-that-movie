/**
 *  Code for home/landing page (client side)
 * 
 *  Contains quiz to allow users to guess the movie the quote belongs to
 */

// Fetch objects via DOM
var userMovieInput = document.getElementById("user-guess");
var userInputBlock = document.getElementById("userinput");
var answerBlock = document.getElementById("right-answer-block");
var wrongBlock = document.getElementById("wrong-answer-block");
var moviename = document.getElementById("movie-name");
var movieanswer = document.querySelectorAll(".moviename");

const COLOR_DARKGREEN = "#138D75";
const COLOR_PRIMARYRED = "#7B241C";
const COLOR_LIGHTGREY = "#AAB7B8";
const MAX_CHAR_LENGTH = 70;

// Initialize
init();

// Initialise form
function init() {
    setupAnswers();
    checkQuoteLength();
}

/** 
 *   Set up quiz
 *   - attach click event 
 *   - check answer and respond appropriately
 */
function setupAnswers() {

    for (let i = 0; i < movieanswer.length; i++) {

        // attach click event to each button
        movieanswer[i].addEventListener("click", function () {

            // change button color so user knows it was clicked (eliminated)
            this.style.backgroundColor = COLOR_LIGHTGREY;

            // capture movie name clicked and movie name answer
            let movieanswer = this.textContent.toLowerCase();
            let userinput = userMovieInput.value.toLowerCase();

            // compare answer and display right/wrong outcome
            movieanswer === userinput ? displayAnswer() : displayWrongAnswer();
        });
    }
}

/**
 *  Resize quote if it is over specific character length to prevent
 *  quote from fallin below the fold
 */
function checkQuoteLength() {
    let quote = document.getElementById("moviequote");

    if (quote) {
        if (quote.textContent.length > MAX_CHAR_LENGTH) {
            if (quote.className === "moviequotelarge default-grey") {
                quote.className = "moviequotemedium default-grey";
            } else {
                quote.className = "moviequotelarge default-grey";
            }
        }
    }
}

/** 
 * Correct answer display
 */
function displayAnswer() {
    moviename.style.color = COLOR_DARKGREEN;
    moviename.style.display = "block";
    userInputBlock.style.display = "none";
    answerBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

/** 
 * Wrong answer display
 */
function displayWrongAnswer() {
    moviename.style.color = COLOR_PRIMARYRED;
    moviename.style.display = "none";
    userInputBlock.style.display = "block";
    answerBlock.style.display = "none";
    wrongBlock.style.display = "block";
}

/** 
 * Reset, allow user to guess again
 */
function guessAgain() {
    userInputBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

/**
 *  Close flash messages
 */
function closeErrorMessageBox() {
    var box = document.getElementById("errorbox");
    if (box.className === "errormessagebox") {
        box.className += " hidemessage";
    } else {
        box.className = "errormessagebox";
    }
}

function closeSuccessMessageBox() {
    var box = document.getElementById("successbox");
    if (box.className === "successmessagebox") {
        box.className += " hidemessage";
    } else {
        box.className = "errormessagebox";
    }
}

/**
 *  Make menu responsive (i.e. hamburger)
 */
function openCloseMenu() {
    var menu = document.getElementById("topMenuNav");
    if (menu.className === "topMenu") {
        menu.className += " responsive";
    } else {
        menu.className = "topMenu";
    }
}