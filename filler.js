/** Filler.js
 *  
 *  Pre-populate db with moviequotes 
 */

var mongoose = require("mongoose");
var Moviequotes = require("./models/moviequotes");
var Moviecomments = require("./models/comments");

var filldata = [{
        moviename: "The Wizard of Oz",
        moviequote: "Pay no attention to that man behind the curtain!",
        screenwriter: "L. Frank Baum",
        year: "1939",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "The Devil Wears Prada",
        moviequote: "I'm just one stomach flu away from my goal weight.",
        screenwriter: "Aline Brosh McKenna",
        year: "2006",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "Snow White and the Seven Dwarfs",
        moviequote: "Magic Mirror on the wall, who is the fairest one of all?",
        screenwriter: "Ted Sears, Richard Creedon, Otto Englander, Dick Rickard, Earl Hurd, Merrill De Maris, Dorothy Ann Blank, Webb Smith",
        year: "1937",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "Star Wars",
        moviequote: "Help me, Obi-Wan Kenobi. You're my only hope.",
        screenwriter: "George Lucas",
        year: "1977",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "The Help",
        moviequote: "You is kind. You is smart. You is important.",
        screenwriter: "Tate Taylor",
        year: "1977",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "When Harry Met Sally",
        moviequote: "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.",
        screenwriter: "Nora Ephron",
        year: "1989",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "Braveheart",
        moviequote: "They may take our lives, but they'll never take our freedom!",
        screenwriter: "Randall Wallace",
        year: "1995",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "In the Heat of the Night",
        moviequote: "They call me Mister Tibbs!",
        screenwriter: "Stirling Silliphant",
        year: "1967",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "Planet of the Apes",
        moviequote: "Get your stinking paws off me, you damned dirty ape!",
        screenwriter: "Rod Serling, Michael Wilson",
        year: "1968",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    },
    {
        moviename: "As Good as It Gets",
        moviequote: "You make me want to be a better man.",
        screenwriter: "James L. Brooks, Mark Andrus",
        year: "1997",
        author: {
            id: "5c3c603c0ea1e9cad4a01bff",
            username: "susan"
        }
    }
];

function fillDB() {
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