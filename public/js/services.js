'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])

	.service('vehicleService', ['$http', function($http) {
		this.getVehicle = function(reg) {
			if (reg != undefined){
				alert($http.get('/api/v1/vehicles/'+reg));
				return $http.get('/api/v1/vehicles/'+reg);
			}
		};

		this.saveVehicle = function(vehicle){
			return $http.post('/api/v1/vehicles',vehicle);
		};

		this.updateVehicle = function(vehicle){
			return $http.put('/api/v1/vehicles/'+vehicle.regNum,vehicle);
		};

		this.vehicleByOwner = function(person){
			return $http.get('/api/v1/vehicleByOwner/'+person._id);
		};

		this.addNewVehicleToOwner = function(regNum,owner){
			return $http.post('/api/v1/addNewVehicleToOwner',{"regNum":regNum,"owner":owner});
		};




	}])

	.service('invoiceService', ["$http",function($http) {
		this.invoice = {"items":[]};
		this.id = 0;
		this.vatRate = 0.2;

		this.calculateTotals = function(invoice){
			var totalExVat = 0;
			var vat = 0

			for (var i = 0; i < invoice.items.length; i++) {
				totalExVat += (invoice.items[i].price) * (invoice.items[i].quantity);
			}

			for (var i = 0; i < invoice.items.length; i++) {
				vat += (invoice.items[i].vat)
			}


			var totalIncVat = totalExVat + vat
			
			invoice.totalExVat = totalExVat;
			invoice.vat = vat;
			invoice.totalIncVat = totalIncVat;
			return invoice


			


		}
	
		this.add = function(item,price,quantity){
			this.newEntry = {"id":this.id ,"item":item,"price":parseFloat(price),"quantity":parseFloat(quantity),"vat":parseFloat(price) * parseFloat(quantity) * this.vatRate,"amount":parseFloat(price) * parseFloat(quantity) +  parseFloat(price) * parseFloat(quantity) * this.vatRate }
			if (this.newEntry.item.toLowerCase() == "mot"){
				this.newEntry.vat = 0;
			}
			console.dir(this.newEntry);
			this.invoice.items.push(this.newEntry);
			this.id ++
			return this.calculateTotals(this.invoice)
		};

		this.remove = function(id){
			for (var i = 0; i < this.invoice.items.length; i++) {
				if (this.invoice.items[i].id ===id){
					this.invoice.items.splice(i, 1);
					return this.calculateTotals(this.invoice)

				}
			}
		}

		this.generate = function(vehicle,person,invoice){
			return $http.post('/api/v1/invoiceMaker/render',{"vehicle":vehicle,"person":person,"invoice":invoice});
		};

		this.save = function(vehicle,person,invoice){
			return $http.post('/api/v1/invoices',{"vehicle":vehicle,"person":person,"invoice":invoice});
		};



	}])
	
	.service('dataSharing', [ function() {
		this.person = {'location':{},'contact':{},'allowedContact':{}}
		this.vehicle = {'regNum':null, 'owner':null}
		this.invoice = {}
	}])
	

	.service('peopleService', ['$http', function($http) {

		this.getPerson = function(personID) {
			return $http.get('/api/v1/people/'+personID);
		};


		this.savePerson = function(person) {
			return $http.post('/api/v1/people',person);
		};

		this.saveBoth = function(person,vehicle) {
			return $http.post('/api/v1/addNew',{"person":person,"vehicle":vehicle});
		};


		this.updatePerson = function(person) {
			return $http.put('/api/v1/people/'+ person._id,person);
		};

		this.peopleSearch = function(person) {
			return $http.post('/api/v1/peopleSearch',person);
		};
	}]);

	

