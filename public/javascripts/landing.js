/**
 *  Code for home/landing page 
 * 
 *  Contains quiz to allow users to name the movie the quote belongs to
 */

var userMovieInput = document.getElementById("user-guess");
var userInputBlock = document.getElementById("userinput");
var answerBlock = document.getElementById("right-answer-block");
var wrongBlock = document.getElementById("wrong-answer-block");
var message = document.getElementById("message");
var moviename = document.getElementById("movie-name");

/** 
    Checks if user entered the correct movie name 
    - is not case sensitive

    - TODO Refactor, possibly toggle style using conditional (ternary) operator
*/
function checkMovieQuote() {
    if (userMovieInput.value.toLowerCase() === "when harry met sally") {

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