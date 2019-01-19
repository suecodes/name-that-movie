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

// Initialize
init();

// Initialise form
function init() {
    setupAnswers();
}

/** 
 *   Set up quiz
 *   - attach click event 
 *   - check answer and respond appropriately
 */
function setupAnswers() {

    // TODO - Fix issue with function being declared within loops referencing an outer scopede variable !!
    for (let i = 0; i < movieanswer.length; i++) {

        // attach click event to each button
        movieanswer[i].addEventListener("click", function () {

            // change button color so user knows it was clicked (eliminated)
            this.style.backgroundColor = "#AAB7B8";

            // capture movie name clicked and movie name answer
            let movieanswer = this.textContent.toLowerCase();
            let userinput = userMovieInput.value.toLowerCase();

            // compare answer and display right/wrong outcome
            movieanswer === userinput ? displayAnswer() : displayWrongAnswer();
        });

    }
}

/** 
 * Correct answer display
 */
function displayAnswer() {
    moviename.style.color = "#138D75";
    moviename.style.visibility = "visible";
    userInputBlock.style.display = "none";
    answerBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

/** 
 * Wrong answer display
 */
function displayWrongAnswer(obj) {
    moviename.style.color = "#7B241C";
    moviename.style.visibility = "hidden";
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