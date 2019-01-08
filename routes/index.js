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
    // load page
    // res.render('landing', {
    //   title: 'Name That Movie',
    //   result: result
    // });
  });

  // get random sample
  // var result = Moviequotes.aggregate([{
  //   $sample: {
  //     size: 2
  //   }
  // }]);
  // console.log(result.toObject({
  //   getters: true
  // }));

  // Moviequotes.aggregate([{
  //   $sample: {
  //     size: 2
  //   }
  // }]).exec(function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     result.prototype.toObject({
  //       getters: true
  //     });
  //     console.log(result);
  //   }
  // });

  // var result = Moviequotes.aggregate([{
  //   $sample: {
  //     size: 5
  //   }
  // }]);
  // res.render('landing', {
  //   title: 'Name That Movie',
  //   result: result
  // });

});

module.exports = router;