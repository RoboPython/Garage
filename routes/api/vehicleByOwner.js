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
	      	var collection = db.collection('vehicles');
			console.log(req.params.id)
			collection.find({"owner":BSON.ObjectID.createFromHexString(req.params.id)}).toArray(function(err,vehicles){
			//collection.find({"owner":req.params.id}).toArray(function(err,vehicles){
				console.log(vehicles);
				res.send(vehicles);
				db.close();
			})
	       	
	      };
	    });
});

module.exports = router;

