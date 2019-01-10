var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// Show home page and random quote
router.get("/", function (req, res, next) {

  // Get random sampling of quotes 
  Moviequotes.aggregate([{
    $sample: {
      size: 4
    }
  }]).exec(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // Render page and return result
      res.render('landing', {
        title: 'Name That Movie',
        result: result
      });
    }
  });



  // count total records in collection
  // Moviequotes.countDocuments().exec(function (err, count) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // Get a random number
  //     var random = Math.floor(Math.random() * count);

  //     // Query all quotes but only fetch one offset by our random #
  //     Moviequotes.findOne().skip(random).exec(function (err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // Render page
  //         res.render('landing', {
  //           title: 'Name That Movie',
  //           result: result
  //         });
  //       }
  //     });
  //   }
  // });
});

module.exports = router;