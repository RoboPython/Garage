var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var BSON = require('bson').BSONPure;

//TODO validation function for things
router.post('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
			res.send('ERROR')
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
			
			if (req.body.person.title){
				person.title = req.body.person.title;
			}
			if (req.body.person.givenName){
				person.givenName = req.body.person.givenName;
			}
			if (req.body.person.familyName){
				person.familyName = req.body.person.familyName;
			}
			if (req.body.person.location.address1){
				person.location.address1 = req.body.person.location.address1;
			}
			if (req.body.person.location.address2){
				person.location.address2 = req.body.person.location.address2;
			}
			if (req.body.person.location.address3){
				person.location.address3 = req.body.person.location.address3;
			}
			if (req.body.person.location.postcode){
				person.location.postcode = req.body.person.location.postcode;
			}
			if (req.body.person.contact.home){
				person.contact.home = req.body.person.contact.home;
			}
			if (req.body.person.contact.mobile){
				person.contact.mobile = req.body.person.contact.mobile;
			}
			if (req.body.person.contact.email){
				person.contact.email = req.body.person.contact.email;
			}
			if (req.body.person.allowedContact.text){
				person.allowedContact.text = true;
			}
			if (req.body.person.allowedContact.email){
				person.allowedContact.email = true;
			}
			if (req.body.person.allowedContact.letter){
				person.allowedContact.letter = true;
			}
			console.log(person)
			collection.insert(person, function(err,personInserted){
				
				var collection = db.collection('vehicles');
				vehicle={
							"regNum":null,
							"chassis":null,
							"make":null,
							"model":null,
							"colour": null,
							"firstReg":null,
							"cc":null,
							"fuel": null,
							"mileage":null,
							"motDue":null,
							"owner":null
						}
				if (req.body.vehicle.regNum){
					vehicle.regNum = req.body.vehicle.regNum
				}
				if (req.body.vehicle.chassis){
					vehicle.chassis = req.body.vehicle.chassis
				}

				if (req.body.vehicle.make){
					vehicle.make = req.body.vehicle.make
				}
				if (req.body.vehicle.model){
					vehicle.model = req.body.vehicle.model
				}
				if (req.body.vehicle.colour){
					vehicle.colour = req.body.vehicle.colour
				}
				if (req.body.vehicle.firstReg){
					vehicle.firstReg = req.body.vehicle.firstReg
				}
				if (req.body.vehicle.cc){
					vehicle.cc = req.body.vehicle.cc
				}
				if (req.body.vehicle.fuel){
					vehicle.fuel = req.body.vehicle.fuel
				}
				if (req.body.vehicle.mileage){
					vehicle.mileage = req.body.vehicle.mileage
				}
				if (req.body.vehicle.motDue){
					vehicle.motDue = req.body.vehicle.motDue
				}
				vehicle.owner = personInserted.ops[0]._id;
				console.log(vehicle);
				collection.insert(vehicle);
				db.close();
				res.send(vehicle);

			});
		};
	});

});



module.exports = router;

