//something
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

//TODO validation function for things
router.post('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		};
		if(!err) {
			var collection = db.collection('bugs');
			var bug = req.body.bug
			bug.date = new Date();
			collection.insert(bug);
			db.close();
			res.send(bug);
		};
	});
});




module.exports = router;
