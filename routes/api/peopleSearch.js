var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;
var url = require('url');



router.post('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		}
	    if(!err) {
			var collection = db.collection('people');
			query = {}
			if (req.body.givenName){
				query["givenName"] = new RegExp("^"+req.body.givenName,"i") 
			};
			if (req.body.familyName){
				query["familyName"] = new RegExp("^"+req.body.familyName,"i");
			}
			if (req.body.location.address1){
				query["location.address1"] = new RegExp("^"+req.body.location.address1,"i");
			}
			if (req.body.location.address2){
				query["location.address2"] = new RegExp("^"+req.body.location.address2,"i");
			}
			if (req.body.location.address3){
				query["location.address3"] = new RegExp("^"+req.body.location.address3,"i");
			}
			if (req.body.location.postcode){
				query["location.postcode"] = new RegExp("^"+req.body.location.postcode,"i");
			}
			if (req.body.contact.home){
				query["contact.home"] = new RegExp("^"+req.body.contact.home,"i");
			}
			if (req.body.contact.mobile){
				query["contact.mobile"] = new RegExp("^"+req.body.contact.mobile,"i");
			}
			if (req.body.contact.email){
				query["contact.email"] = new RegExp("^"+req.body.contact.email,"i");
			}
			console.log("query")
			collection.find(query).toArray(function(err, people) {
				res.send(people);
				db.close();
			 });
			
		};
	});
});

module.exports = router;

