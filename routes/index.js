var express = require('express');
var router = express.Router();

// Show home page
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Name That Movie'
  });
});

// Show collection of movie quotes 
router.get('/moviequotes', function (req, res, next) {
  res.render('moviequotes', {
    title: 'Name That Movie'
  });
});

module.exports = router;