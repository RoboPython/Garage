var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;

/*GET - Retrieves a list of all current people*/
router.get('/', function(req, res, next) {
	//returns specific entry
	if (req.params.id){
		console.log("ok getting this far")
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('people');
	        collection.findOne({"_id":BSON.ObjectID.createFromHexString(req.params.id)}, function(err, person) {
	       		res.send(person);
				db.close();
	        });
	        
	      };
	    });
	}else{
		console.log("get all");
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('people');
			collection.find({}).toArray(function(err,people){
				console.log(people);
				res.send(people);
				db.close();
			})
	       	
	      };
	    });
	};
});



router.get('/:id*?', function(req, res, next) {
	//returns specific entry
	if (req.params.id){
		console.log("ok getting this far")
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('people');
	        collection.findOne({"_id":BSON.ObjectID.createFromHexString(req.params.id)}, function(err, person) {
	       		res.send(person);
				db.close();
	        });
	        
	      };
	    });
	}else{
		console.log("get all");
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('people');
			collection.find({}).toArray(function(err,people){
				console.log(people);
				res.send(people);
			})
	       	
	      };
	    });
	};
});



//TODO validation function for things
router.post('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
			res.send('ERROR')
		};
		if(!err) {
			console.log("before")
			console.log(req.body)
			var collection = db.collection('people');
			person = {
					"title":null,
					"givenName":null,
					"familyName":null,
					"location":{
						"address1": null,
						"address2": null,
						"address3": null,
						"postcode":null
					},
					"contact":{
						"home":null,
						"mobile":null,
						"email":null
					},
					"allowedContact":{
						"text":false,
						"email":false,
						"letter":false

					}
			};
			
			if (req.body.title){
				person.title = req.body.title;
			}
			if (req.body.givenName){
				person.givenName = req.body.givenName;
			}
			if (req.body.familyName){
				person.familyName = req.body.familyName;
			}
			if (req.body.location.address1){
				person.location.address1 = req.body.location.address1;
			}
			if (req.body.location.address2){
				person.location.address2 = req.body.location.address2;
			}
			if (req.body.location.address3){
				person.location.address3 = req.body.location.address3;
			}
			if (req.body.location.postcode){
				person.location.postcode = req.body.location.postcode;
			}
			if (req.body.contact.home){
				person.contact.home = req.body.contact.home;
			}
			if (req.body.contact.mobile){
				person.contact.mobile = req.body.contact.mobile;
			}
			if (req.body.contact.email){
				person.contact.email = req.body.contact.email;
			}
			if (req.body.allowedContact.text){
				person.allowedContact.text = true;
			}
			if (req.body.allowedContact.email){
				person.allowedContact.email = true;
			}
			if (req.body.allowedContact.letter){
				person.allowedContact.letter = true;
			}
			console.log("after")
			console.log(person)
			collection.insert(person)
			res.send(person);
			db.close();
		};
	});

});

router.put('/:id*?', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		};
		if(!err) {
			var collection = db.collection('people');

			person = {
					"title":null,
					"givenName":null,
					"familyName":null,
					"location":{
						"address1": null,
						"address2": null,
						"address3": null,
						"postcode":null
					},
					"contact":{
						"home":null,
						"mobile":null,
						"email":null
					},
					"allowedContact":{
						"text":false,
						"email":false,
						"letter":false

					}
			};
			
			if (req.body.title){
				person.title = req.body.title;
			}
			if (req.body.givenName){
				person.givenName = req.body.givenName;
			}
			if (req.body.familyName){
				person.familyName = req.body.familyName;
			}
			if (req.body.location.address1){
				person.location.address1 = req.body.location.address1;
			}
			if (req.body.location.address2){
				person.location.address2 = req.body.location.address2;
			}
			if (req.body.location.address3){
				person.location.address3 = req.body.location.address3;
			}
			if (req.body.location.postcode){
				person.location.postcode = req.body.location.postcode;
			}
			if (req.body.contact.home){
				person.contact.home = req.body.contact.home;
			}
			if (req.body.contact.mobile){
				person.contact.mobile = req.body.contact.mobile;
			}
			if (req.body.contact.email){
				person.contact.email = req.body.contact.email;
			}
			if (req.body.allowedContact.text){
				person.allowedContact.text = true;
			}
			if (req.body.allowedContact.email){
				person.allowedContact.email = true;
			}
			if (req.body.allowedContact.letter){
				person.allowedContact.letter = true;
			}
			console.log(person)
			collection.update({"_id":BSON.ObjectID.createFromHexString(req.params.id)},{ $set: person},function(err, result) {
				if (err){
					console.log("Can't update" + err);
				}else{
					console.log("sucessfully updated");
					res.send(result);
					db.close();
				};
			});
		};
	});
});



router.delete('/:id*?', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		};
		if(!err) {
			var collection = db.collection('people');
			collection.update({"_id":req.params.id},function(err, result) {
				if (err){
					console.log("Can't delete" + err);
				}else{
					console.log("sucessfully deleted");
					res.send(result);
				};
			});
		};
	});
});





module.exports = router;
