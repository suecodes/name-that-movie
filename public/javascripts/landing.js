/**
 *  Code for home/landing page (client side)
 * 
 *  Contains quiz to allow users to name the movie the quote belongs to
 */

var userMovieInput = document.getElementById("user-guess");
var userInputBlock = document.getElementById("userinput");
var answerBlock = document.getElementById("right-answer-block");
var wrongBlock = document.getElementById("wrong-answer-block");
var message = document.getElementById("message");
var moviename = document.getElementById("movie-name");
var quoteField = document.getElementById("moviequote");

// Get movie name buttons
var movieanswer = document.querySelectorAll(".moviename");

init();

function init() {
    setupAnswers();
}

function setupAnswers() {
    for (var i = 0; i < movieanswer.length; i++) {
        // add click event 
        movieanswer[i].addEventListener("click", function () {
            // get color of clicked button and change to green
            console.log(this.textContent);
            console.log("answer = " + userMovieInput.value);
            if (this.textContent.toLowerCase() === userMovieInput.value.toLowerCase()) {
                // right answer
                this.style.backgroundColor = "#138D75";

                moviename.style.visibility = "visible";
                userInputBlock.style.display = "none";
                answerBlock.style.display = "block";
                wrongBlock.style.display = "none";
            } else {
                // wrong answer
                this.style.backgroundColor = "#7B241C";

                moviename.style.visibility = "hidden";
                userInputBlock.style.display = "none";
                answerBlock.style.display = "none";
                wrongBlock.style.display = "block";
            }
        });
    }
}

/** 
    Checks if user entered the correct movie name 
    - is not case sensitive

    - TODO Refactor, possibly toggle style using conditional (ternary) operator
*/
function checkMovieQuote(name) {

    if (userMovieInput.value.toLowerCase() === name.toLowerCase()) {

        // right answer
        moviename.style.visibility = "visible";
        userInputBlock.style.display = "none";
        answerBlock.style.display = "block";
        wrongBlock.style.display = "none";

    } else {

        // wrong answer
        moviename.style.visibility = "hidden";
        userInputBlock.style.display = "none";
        answerBlock.style.display = "none";
        wrongBlock.style.display = "block";
    }
}

/** 
    User requests answer to quote

    - TODO Refactor, repeats code from above. Need to split into sep function and just call that function
*/
function displayAnswer() {
    moviename.style.visibility = "visible";
    userInputBlock.style.display = "none";
    answerBlock.style.display = "block";
    wrongBlock.style.display = "none";
}

/** 
    Reset, display input field for new guess
*/
function guessAgain() {
    userMovieInput.value = "";
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