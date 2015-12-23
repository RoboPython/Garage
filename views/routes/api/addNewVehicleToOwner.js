var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var BSON = require('bson').BSONPure;


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


router.post('/', function(req, res, next) {
	//returns specific entry
	if (req.body.regNum){
		//console.log("get one")
		MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	      if (err){
			 console.log("Can't connect" + err);
	      }
	      if(!err) {
	      	var collection = db.collection('vehicles');
	        collection.findOne({"regNum":req.body.regNum}, function(err, vehicle) {
	        	if (vehicle == null){
	        		//console.log("nothing in ours going to DVLA");
	        		request('https://dvlasearch.appspot.com/DvlaSearch?licencePlate='+req.body.regNum+'&apikey=DvlaSearchDemoAccount', function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					  	//console.log("got response");
					  	body= JSON.parse(body)
					  	var motDueDate = [body.motDetails.split(" ")[1],monthToJSDate[body.motDetails.split(" ")[2]],body.motDetails.split(" ")[3]].join("/");
					  	var carResponseJSON = {regNum:req.body.regNum,
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
					    carResponseJSON.owner = BSON.ObjectID.createFromHexString(req.body.owner) 
						console.log(carResponseJSON)
						collection.insert(carResponseJSON,function(err){
							collection.find({"owner":BSON.ObjectID.createFromHexString(req.body.owner)}).toArray(function(err,vehicles){
							//collection.find({"owner":req.body.owner}).toArray(function(err,vehicles){
								console.log("vehiclesList now");
								console.log(vehicles);
								res.send(vehicles);
								db.close();
							})
						});

					  }
					})
	        	}else{
					vehicle.owner = BSON.ObjectID.createFromHexString(req.body.owner) 
					collection.insert(vehicle,function(err){
						collection.find({"owner":req.body.owner}).toArray(function(err,vehicles){
							console.log("vehiclesList now")
							console.log(vehicles);
							res.send(vehicles);
							db.close();
						})
					});

	        	};
	        });
	        
	      };
	    });
	}
});


module.exports = router;

