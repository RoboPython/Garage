var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;


router.get('/:id*?', function(req, res, next) {
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('invoices');
			console.log(req.params.id)
			collection.find({"data.vehicle":req.params.id}).toArray(function(err,invoices){
				console.log(invoices);
				res.send({"invoiceList":invoices});
				db.close();
			})
	       	
	      };
	    });
});

module.exports = router;
