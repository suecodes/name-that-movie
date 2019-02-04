/**
 *  Code for home/landing page (client side)
 * 
 *  Contains quiz to allow users to guess the movie the quote belongs to
 */

// Fetch objects via DOM
var userMovieInput = document.getElementById("user-guess");
var userInputBlock = document.getElementById("userinput");
var answerBlock = document.getElementById("right-answer-block");
var wrongBlock = document.getElementById("message-block");
var moviename = document.getElementById("movie-name");
var movieanswer = document.querySelectorAll(".moviename");
var menu = document.getElementById("topMenuNav");
var message = document.getElementById("usermessage");

const COLOR_DARKGREEN = "#138D75";
const COLOR_PRIMARYRED = "#7B241C";
const COLOR_WHITE = "#ffffff";
const COLOR_DARKESTGREY = "#1B2631";
const COLOR_GREENISH = "#45B39D";
const MAX_CHAR_LENGTH = 80;

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
            this.style.backgroundColor = COLOR_GREENISH;

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
            if (quote.className === "flexitem moviequotelarge") {
                quote.className = "flexitem moviequotemedium";
            } else {
                quote.className = "flexitem moviequotelarge";
            }
        }
    }
}

/** 
 * Correct answer display
 */
function displayAnswer() {
    moviename.style.color = COLOR_DARKESTGREY;
    moviename.style.display = "block";
    userInputBlock.style.display = "none";
    answerBlock.style.display = "block";
    wrongBlock.style.visibility = "visible";
    message.textContent = "Correct! What do you want to do next?";
}

/** 
 * Wrong answer display
 */
function displayWrongAnswer() {
    moviename.style.color = COLOR_PRIMARYRED;
    moviename.style.display = "none";
    userInputBlock.style.display = "block";
    answerBlock.style.display = "none";
    wrongBlock.style.visibility = "visible";
    message.textContent = "Wrong! Try again.";
}

/** 
 * Reset, allow user to guess again
 */
function guessAgain() {
    userInputBlock.style.display = "block";
    wrongBlock.style.visibility = "hidden";
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