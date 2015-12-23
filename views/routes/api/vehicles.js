var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');


var monthToJSDate = {"January":0,
					"February":1,
					"March":2,
					"April":3,
					"May":4,
					"June":5,
					"July":6,
					"August":7,
					"September":8,
					"October":9,
					"November":10,
					"December":11
					}

/*GET - Retrieves a list of all current vehicles*/



router.get('/:regNum*?', function(req, res, next) {
	//returns specific entry
	if (req.params.regNum){
		console.log("get one")
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
	        console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('vehicles');
	        collection.findOne({"regNum":req.params.regNum}, function(err, vehicles) {
	        	if (vehicles == null){
	        		console.log("nothing in ours going to DVLA");
	        		request('https://dvlasearch.appspot.com/DvlaSearch?licencePlate='+req.params.regNum+'&apikey=DvlaSearchDemoAccount', function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					  	console.log("got response");
					  	body= JSON.parse(body)
					  	var motDueDate = [body.motDetails.split(" ")[1],monthToJSDate[body.motDetails.split(" ")[2]],body.motDetails.split(" ")[3]].join("/");
					  	var carResponseJSON = {regNum:req.params.regNum,
											   make:body.make,
											   model:body.model,
											   chassis: null,
											   colour:body.colour,
											   firstReg:body.dateOfFirstRegistration,
											   cc: body.cylinderCapacity.substring(0, body.cylinderCapacity.length - 2),
											   fuel:body.fuelType,
											   motDue:motDueDate,
											   mileage: null,
											   owner:'unassigned',
											}
					    res.send(carResponseJSON);
					  }
					})
	        	}else{
	        		res.send(vehicles);
	        	};
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
	      	var collection = db.collection('vehicles');
			collection.find({}).toArray(function(err,vehicle){
				console.log(vehicle);
				res.send(vehicle);
				db.close();
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
		};
		if(!err) {
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
			if (req.body.regNum){
				vehicle.regNum = req.body.regNum
			}
			if (req.body.chassis){
				vehicle.chassis = req.body.chassis
			}
			if (req.body.make){
				vehicle.make = req.body.make
			}
			if (req.body.model){
				vehicle.model = req.body.model
			}
			if (req.body.colour){
				vehicle.colour = req.body.colour
			}
			if (req.body.firstReg){
				vehicle.firstReg = req.body.firstReg
			}
			if (req.body.cc){
				vehicle.cc = req.body.cc
			}
			if (req.body.fuel){
				vehicle.fuel = req.body.fuel
			}
			if (req.body.mileage){
				vehicle.mileage = req.body.mileage
			}
			if (req.body.motDue){
				vehicle.motDue = req.body.motDue
			}
			if (req.body.owner){
				vehicle.owner = req.body.owner
			}
			collection.insert(vehicle);
			db.close();
			res.send(vehicle);
		};
	});
});


router.put('/:regNum*?', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		};
		if(!err) {
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
			if (req.body.regNum){
				vehicle.regNum = req.body.regNum
			}
			if (req.body.chassis){
				vehicle.chassis = req.body.chassis
			}
			if (req.body.make){
				vehicle.make = req.body.make
			}
			if (req.body.model){
				vehicle.model = req.body.model
			}
			if (req.body.colour){
				vehicle.colour = req.body.colour
			}
			if (req.body.firstReg){
				vehicle.firstReg = req.body.firstReg
			}
			if (req.body.cc){
				vehicle.cc = req.body.cc
			}
			if (req.body.fuel){
				vehicle.fuel = req.body.fuel
			}
			if (req.body.mileage){
				vehicle.mileage = req.body.mileage
			}
			if (req.body.motDue){
				vehicle.motDue = req.body.motDue
			}
			if (req.body.owner){
				vehicle.owner = req.body.owner
			}
			collection.update({"regNum":req.params.regNum},{ $set: vehicle},function(err, result) {
				if (err){
					console.log("Can't update" + err);
				}else{
					console.log("sucessfully updated");
					res.send(result);
				};
			});
			db.close();
			res.send(vehicle);
		};
	});
});


router.put('/:regNum*?', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			console.log("Can't connect" + err);
		};
		if(!err) {
			var collection = db.collection('vehicles');
			collection.update({"regNum":req.params.regNum},{ $set: req.body },function(err, result) {
				if (err){
					console.log("Can't update" + err);
				}else{
					console.log("sucessfully updated");
					res.send(result);
				};
			});
		};
	});
});









module.exports = router;
