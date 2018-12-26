var express = require('express');
var router = express.Router();

// Show home page
router.get("/", function (req, res, next) {
  res.render('landing', {
    title: 'Name That Movie',
  });
});

module.exports = router;