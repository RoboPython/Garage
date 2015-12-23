var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var fs = require('fs');
var sys   = require('sys');
var ejs = require('ejs');



	        
router.get('/', function(request, response){
	
	fs.readFile('/Users/adam/Documents/Garage Project/perf/views/invoice.ejs', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
		var rendered = ejs.render(data,{"data":{"customerName":"bob","date":"22/12/15","invoiceNum":334,"mileage":100,"car":"vaux Zafira", "regNum": "FD08 ZNH","invoice":{"items":[{"item":"thing","quantity":2,"rate":1.2,"vat":0.6,"amount":22}],"totalIncVat":100,"totalExVat":100,"vat":20}}})
		fs.writeFile("/Users/adam/Documents/Garage Project/perf/test.tex", rendered, function(err) {
			if(err) {
				return console.log(err);
			}
				console.log("The file was saved!");
	
				spawn = require('child_process').spawn,
				pdflatex= spawn('pdflatex', ['-output-directory', '/Users/adam/Documents/Garage Project/perf/','test.tex']);


				pdflatex.on('exit', function (code) {
					console.log('child process exited with code ' + code);
					var tempFile="/Users/adam/Documents/Garage Project/perf/test.pdf";
						fs.readFile(tempFile, function (err,data){
							response.contentType("application/pdf");
							response.send(data);
						});
					});
				});

		}); 


	});

	





module.exports = router;

