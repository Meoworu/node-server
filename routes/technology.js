const express = require('express');
const router = express.Router();
const assert = require('assert');
const mongo = require('../public/javascripts/mongo.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.find('box', function(items){
        res.send(items);
    });
});


module.exports = router;