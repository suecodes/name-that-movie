/**
 *  Code for home/landing page (client side)
 *
 *  Contains quiz to allow users to guess the movie the quote belongs to
 */

// Fetch objects via DOM
const userMovieInput = document.getElementById("user-guess");
const userInputBlock = document.getElementById("userinput");
const answerBlock = document.getElementById("right-answer-block");
const messageBlock = document.getElementById("message-block");
const movienameyear = document.getElementById("movienameyear");
const movieanswer = document.querySelectorAll(".moviename");
const menu = document.getElementById("topMenuNav");
const message = document.getElementById("usermessage");
const buttonicon = document.querySelectorAll(".buttonicon");

// Not immutable values
const COLOR_PRIMARYBLUE = "#2d78ad";
const COLOR_PINKISHRED = "#c0392b";
const COLOR_PRIMARYRED = "#7B241C";
const COLOR_WHITE = "#ffffff";

const MAX_CHAR_LENGTH = 60;
const FAIL_MESSAGE = "Wrong! Try again.";
const SUCCESS_MESSAGE = "Correct! What do you want to do next?";

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
    movieanswer[i].addEventListener("click", function() {
      // change button color and fade it out so user knows it was clicked (eliminated)
      this.style.backgroundColor = COLOR_PINKISHRED;
      this.style.color = COLOR_WHITE;
      $(this).animate({ opacity: 0 }, 1000);

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
 *  quote from falling below the fold
 */
function checkQuoteLength() {
  let quote = document.getElementById("movie-quote");

  if (quote) {
    if (quote.textContent.length > MAX_CHAR_LENGTH) {
      if (quote.className === "flexitem moviequotelarge") {
        quote.className = "flexitem moviequotemedium";
      } else {
        quote.className = "flexitem moviequotelarge ";
      }
    }
  }
}

/**
 * Correct answer display
 */
function displayAnswer() {
  movienameyear.style.color = COLOR_PRIMARYBLUE;
  movienameyear.style.display = "block";
  userInputBlock.style.display = "none";
  answerBlock.style.display = "block";
  messageBlock.style.display = "block";
  message.textContent = SUCCESS_MESSAGE;
}

/**
 * Wrong answer display
 */
function displayWrongAnswer() {
  movienameyear.style.color = COLOR_PRIMARYRED;
  movienameyear.style.display = "none";
  userInputBlock.style.display = "block";
  answerBlock.style.display = "none";
  messageBlock.style.display = "block";
  message.textContent = FAIL_MESSAGE;
}

/**
 * Reset, allow user to guess again
 */
function guessAgain() {
  userInputBlock.style.display = "block";
  messageBlock.style.display = "none";
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
