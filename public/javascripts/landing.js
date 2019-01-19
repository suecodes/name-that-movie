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
var message = document.getElementById("message");
var moviename = document.getElementById("movie-name");
var quoteField = document.getElementById("moviequote");
var movieanswer = document.querySelectorAll(".moviename");
var wronganswer = document.getElementById("incorrectanswer");
var rightanswer = document.getElementById("rightanswer");
var commentCreatedDate = document.getElementById("createdDate");

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

            let movieanswer = this.textContent.toLowerCase();
            let userinput = userMovieInput.value.toLowerCase();

            movieanswer === userinput ? displayAnswer() : displayWrongAnswer();

            // Check if user clicked the correct answer
            // if (this.textContent.toLowerCase() === userMovieInput.value.toLowerCase()) {
            //     displayAnswer();
            // } else {
            //     // wrong answer
            //     displayWrongAnswer();
            // }
        });

    }
}

/** 
    User requests answer to quote

    - TODO Refactor, repeats code from above. Need to split into sep function and just call that function
*/
function displayAnswer() {
    moviename.style.color = "#138D75";
    moviename.style.visibility = "visible";
    userInputBlock.style.display = "none";
    answerBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

function displayWrongAnswer() {
    this.style.backgroundColor = "#AAB7B8";
    moviename.style.color = "#7B241C";
    moviename.style.visibility = "hidden";
    userInputBlock.style.display = "block";
    answerBlock.style.display = "none";
    wrongBlock.style.display = "block";
}

/** 
    Reset, display input field for new guess
*/
function guessAgain() {
    //userMovieInput.value = "";
    userInputBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

/** 
    TODO Display quote as a typewriter effect (Not in use)
*/
var i = 0;
var speed = 50;

function typeWriter(name) {
    if (i < name.length) {
        document.getElementById("quoteField").innerHTML += name.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}