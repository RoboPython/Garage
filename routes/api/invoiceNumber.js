var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

router.get('/', function(req, res, next) {

	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	  if (err){
		console.log("Can't connect" + err);
	  }
	  if(!err) {
		db.collection("info").findOne({"use":"invoiceNumber"}, function(err, invoiceNumber) {
			res.send(invoiceNumber);
			db.collection("info").update({"use":"invoiceNumber"},{"$inc":{"number":1}})
			
			db.close();
		})

	  };
});

});



module.exports = router;

