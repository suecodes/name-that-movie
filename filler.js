/** Filler.js
 *  
 *  Pre-populate db with moviequotes 
 */

const Moviequotes = require("./models/moviequotes");
const Moviecomments = require("./models/comments");

// Add default user id for starter data
const USERNAME = "Susan";
const USERID = "5c617094b317e20004d8b962";

const filldata = [{
        moviename: "The Wizard of Oz",
        moviequote: "Pay no attention to that man behind the curtain!",
        screenwriter: "L. Frank Baum",
        year: "1939",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "The Devil Wears Prada",
        moviequote: "I'm just one stomach flu away from my goal weight.",
        screenwriter: "Aline Brosh McKenna",
        year: "2006",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Snow White and the Seven Dwarfs",
        moviequote: "Magic Mirror on the wall, who is the fairest one of all?",
        screenwriter: "Ted Sears, Richard Creedon, Otto Englander, Dick Rickard, Earl Hurd, Merrill De Maris, Dorothy Ann Blank, Webb Smith",
        year: "1937",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Star Wars",
        moviequote: "Help me, Obi-Wan Kenobi. You're my only hope.",
        screenwriter: "George Lucas",
        year: "1977",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "The Help",
        moviequote: "You is kind. You is smart. You is important.",
        screenwriter: "Tate Taylor",
        year: "1977",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "When Harry Met Sally",
        moviequote: "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.",
        screenwriter: "Nora Ephron",
        year: "1989",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Braveheart",
        moviequote: "They may take our lives, but they'll never take our freedom!",
        screenwriter: "Randall Wallace",
        year: "1995",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "In the Heat of the Night",
        moviequote: "They call me Mister Tibbs!",
        screenwriter: "Stirling Silliphant",
        year: "1967",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Planet of the Apes",
        moviequote: "Get your stinking paws off me, you damned dirty ape!",
        screenwriter: "Rod Serling, Michael Wilson",
        year: "1968",
        author: {
            id: "5c477d155b6b3734b7f271e4",
            username: "edward"
        }
    },
    {
        moviename: "As Good as It Gets",
        moviequote: "You make me want to be a better man.",
        screenwriter: "James L. Brooks, Mark Andrus",
        year: "1997",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Goodfellas",
        moviequote: "I mean, funny like I'm a clown? I amuse you?",
        screenwriter: "Martin Scorsese, Nicholas Pileggi",
        year: "1990",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Field of Dreams",
        moviequote: "If you build it, he will come.",
        screenwriter: "Phil Alden Robinson",
        year: "1989",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Finding Nemo",
        moviequote: "Just keep swimming.",
        screenwriter: "Andrew Stanton",
        year: "2003",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Titanic",
        moviequote: "I'm the king of the world!",
        screenwriter: "James Cameron",
        year: "1997",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "The Godfather, Part II",
        moviequote: "Keep your friends close, but your enemies closer.",
        screenwriter: "Francis Ford Coppola‎, ‎Mario Puzo",
        year: "1974",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Back to the Future",
        moviequote: "Roads? Where we're going we don't need roads.",
        screenwriter: "Robert Zemeckis‎, ‎Bob Gale",
        year: "1995",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Dirty Harry",
        moviequote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya punk?",
        screenwriter: "John Milius, Harry Julian Fink, Chuck Reisner Jr., R. M. Fink",
        year: "1971",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Dead Poets Society",
        moviequote: "Carpe diem. Seize the day, boys.",
        screenwriter: "Tom Schulman",
        year: "1989",
        author: {
            id: USERID,
            username: USERNAME
        }
    },
    {
        moviename: "Apollo 13",
        moviequote: "Houston, we have a problem.",
        screenwriter: "William Broyles Jr.‎, ‎Al Reinert",
        year: "1995",
        author: {
            id: USERID,
            username: USERNAME
        }
    }
];




// Fill database with default quote set
function fillDB() {

    // Blow away all data in db

    // remove all moviequotes
    Moviequotes.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed movie quotes");
    });

    // remove all comments
    Moviecomments.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed movie comments");
    });

    // add a few movie quotes
    filldata.forEach(function (fill) {
        Moviequotes.create(fill, function (err, moviequotes) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added a movie quote");
            }
        });
    });
}

module.exports = fillDB;