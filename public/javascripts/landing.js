var userMovieInput = document.getElementById("user-guess");
var userInputBlock = document.getElementById("userinput");
var answerBlock = document.getElementById("right-answer-block");
var wrongBlock = document.getElementById("wrong-answer-block");
var message = document.getElementById("message");

function checkMovieQuote() {
    if (userMovieInput.value.toLowerCase() === "when harry met sally") {
        userInputBlock.style.display = "none";
        answerBlock.style.display = "block";
        wrongBlock.style.display = "none";
    } else {
        userInputBlock.style.display = "none";
        answerBlock.style.display = "none";
        wrongBlock.style.display = "block";
    }
}