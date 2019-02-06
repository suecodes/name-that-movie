/**
 *  Users Router
 * 
 *  Future functionality for user profile, likes, favorites, etc.
 *  
 */

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;