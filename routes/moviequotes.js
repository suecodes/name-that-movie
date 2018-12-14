var express = require('express');
var router = express.Router();


router.get('/edit', function (req, res, next) {
    res.send("edit page");
});

module.exports = router;