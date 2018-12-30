var express = require('express');
var router = express.Router();
var Moviequotes = require("../models/moviequotes");

// Show home page and random quote
router.get("/", function (req, res, next) {
  Moviequotes.countDocuments().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count);

    // Query all quotes but only fetch one offset by our random #
    Moviequotes.findOne().skip(random).exec(
      function (err, result) {
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

//router.post("/", function (req, res) {
//  console.log(req.params);
//});

module.exports = router;