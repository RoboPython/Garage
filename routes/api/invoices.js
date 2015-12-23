var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

//TODO validation function for things
router.post('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		if (err){
			res.statusCode = 500;
			res.send("Can't connect" + err);
		};
		if(!err) {
			var collection = db.collection('invoices');

			var person = req.body.person;
			var vehicle = req.body.vehicle;
			var invoice = req.body.invoice;
			var datetime = new Date();

			console.log(request.body)

			var fillInfo={"data":{"customerName":person.givenName + ' ' +person.familyName,
						 "date": String(datetime.getDate()) +'/'+ String((datetime.getMonth() + 1))+'/'+String(datetime.getFullYear()),
						 "invoiceNum":334,
						 "mileage":vehicle.mileage,
						 "car":vehicle.make +" "+vehicle.model,
						 "regNum": vehicle.regNum,
						 "invoice":{
									"items":[],
									"totalIncVat":invoice.totalIncVat.toFixed(2),
									"totalExVat":invoice.totalExVat.toFixed(2),
									"vat":invoice.vat.toFixed(2)
									}
						}
				}	

			for (i = 0; i < invoice.items.length; i++) {
				invoice.items[i].amount =invoice.items[i].amount.toFixed(2);
				invoice.items[i].vat =invoice.items[i].vat.toFixed(2);
				invoice.items[i].price =invoice.items[i].price.toFixed(2);
				fillInfo.data.invoice.items.push(invoice.items[i]);
			}

			
			collection.insert(fillInfo);
			res.send("done");
			db.close();
		};
	});
});



module.exports = router;

