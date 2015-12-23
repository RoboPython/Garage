var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var fs = require('fs');
var sys   = require('sys');
var ejs = require('ejs');



router.post('/render', function(request, response){
	
	fs.readFile('/Users/adam/Documents/Garage Project/githubgarage/views/invoice.ejs', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		var person = request.body.person;
		var vehicle = request.body.vehicle;
		var invoice = request.body.invoice;
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

		console.dir(fillInfo.data.invoice.items)

		var rendered = ejs.render(data,fillInfo)
		fs.writeFile("/Users/adam/Documents/Garage Project/githubgarage/test.tex", rendered, function(err) {
			if(err) {
				return console.log(err);
			}
				console.log("The file was saved!");
	
				spawn = require('child_process').spawn,
				pdflatex= spawn('pdflatex', ['-output-directory', '/Users/adam/Documents/Garage Project/githubgarage/','test.tex']);


				pdflatex.on('exit', function (code) {
					if (code === 0){
						response.send("sucess")
					}else{
						response.statusCode = 500;
						response.send("failure");
					}
				});

		}); 


	});
});

router.get('/view', function(request, response){	
	var tempFile="/Users/adam/Documents/Garage Project/githubgarage/test.pdf";
	fs.readFile(tempFile, function (err,data){
		response.contentType("application/pdf");
		response.send(data);
	});
});


module.exports = router;

