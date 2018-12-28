var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// Show home page and random quote
router.get("/", function (req, res, next) {
  Moviequotes.countDocuments().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count);

    // Again query all users but only fetch one offset by our random #
    Moviequotes.findOne().skip(random).exec(
      function (err, result) {
        // Tada! random quote
        console.log(result._id);
        res.render('landing', {
          title: 'Name That Movie',
          result: result
        });
      });
  });

  // var result = Moviequotes.aggregate([{
  //   $sample: {
  //     size: 1
  //   }
  // }]);
  // res.render('landing', {
  //   title: 'Name That Movie',
  //   result: result
  // });

});

module.exports = router;