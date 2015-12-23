'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  })

  .controller('recordCtrl', ['$scope','vehicleService','peopleService','dataSharing', function($scope,vehicleService,peopleService,dataSharing) {
	  $scope.person = dataSharing.person;
	  $scope.vehicle = dataSharing.vehicle;
	  $scope.selectMode = false;


	  $scope.vehicleSearch = function(reg){
		$scope.result = vehicleService.getVehicle(reg)
			.success(function (vehicle) {
				dataSharing.vehicle = vehicle;
				$scope.vehicle = dataSharing.vehicle;
				if ($scope.vehicle.owner === "unassigned"){
					dataSharing.person ={'location':{},'contact':{},'allowedContact':{}} ; 
					$scope.person = dataSharing.person;
				}else{
					$scope.result2 = peopleService.getPerson($scope.vehicle.owner)
					.success(function(foundPerson){
						dataSharing.person = foundPerson;
						$scope.person = dataSharing.person;
					})
					.error(function (error) {
						alert('Unable to load customer data: ' + error.message);
					});
					
					

				}
				$scope.vehicle.invoices = []//do this properly in future but for now dummy it
			})
            .error(function (error) {
				$scope.status = 'Unable to load vehicle data: ' + error.message;
			});
	  }

	  $scope.save = function(person,vehicle){
		if (!person._id && !vehicle._id){ //adding whole new person
			$scope.result = peopleService.saveBoth(person,vehicle)
				.success(function (resp) {
					alert('done');
				})
				.error(function (error) {
					alert('Unable to load customer data: ' + error.message);
				});


		}else{ //updating car and person, both will have IDs as they will have been added through the add new car feature.
			$scope.result = peopleService.updatePerson(person)
				.success(function (message) {
					alert(message);
				})
				.error(function (error) {
					alert('Unable to load customer data: ' + error.message);
				});

			$scope.result = vehicleService.updateVehicle(vehicle)
				.success(function (message) {
					alert(message);
				})
				.error(function (error) {
					alert('Unable to load vehicle data: ' + error.message);
				});

		}
	  };

	  $scope.selectVehicle = function(vehicle){
		dataSharing.vehicle = vehicle;
		$scope.vehicle = dataSharing.vehicle;
		$scope.selectMode = false;
	  }
	
	  $scope.peopleSearch = function(person){
		
		$scope.result = peopleService.peopleSearch(person)
			.success(function (people){
				$scope.suggestions = people;
				if (people.length === 1){
					dataSharing.person = people[0]
					$scope.person = dataSharing.person
					$scope.result2 = vehicleService.vehicleByOwner($scope.person)
					.success(function (vehicles){
						$scope.vehicleList = vehicles
						if (vehicles.length === 1){
							dataSharing.vehicle = vehicles[0]
							$scope.vehicle = dataSharing.vehicle;
						}else{
							$scope.selectMode =  true;
						}
					});
					


				}
			})
            .error(function (error) {
				$scope.status = 'Unable to load customer data: ' + error.message;
			});
		

	  
	  }

	  $scope.clearRecords = function(){
		dataSharing.person = {'location':{},'contact':{},'allowedContact':{}};
		$scope.person = dataSharing.person;
	    dataSharing.vehicle = {'regNum':null, 'owner':null}
	    $scope.vehicle = dataSharing.vehicle;
		$scope.vehicleSearchBar = null;
		$scope.selectMode = false;
	  }

	  $scope.addNewVehicleToOwner = function (regNum,owner){
		$scope.result = vehicleService.addNewVehicleToOwner(regNum,owner)
			.success(function (vehicles){
				$scope.vehicleList = vehicles
				if (vehicles.length === 1){
					dataSharing.vehicle = vehicles[0]
					$scope.vehicle = dataSharing.vehicle;
				}else{
					$scope.selectMode =  true;
				}
			});
		}

		
	  

	
  }])
  .controller('invoiceCtrl',['$scope','$window','invoiceService', 'dataSharing', function ($scope,$window,invoiceService,dataSharing) {
	$scope.vehicle = dataSharing.vehicle;
	$scope.person = dataSharing.person;
	$scope.invoice = invoiceService.invoice
	
	$scope.addItem = function(item,price,quantity){
		$scope.invoice = invoiceService.add(item,price,quantity)
		$scope.input = {}
	}

	$scope.removeItem = function(id){
		$scope.invoice = invoiceService.remove(id)
	}

	$scope.generateInvoice = function(vehicle,person,invoice){
		console.log(vehicle,person,invoice)
		$scope.result = invoiceService.generate(vehicle,person,invoice)
		.success(function(successMessage){
			console.log(successMessage)
			$window.open('/api/v1/invoiceMaker/view', '_blank');

		})
		.error(function (error) {
			console.log(error)
		});
		
	}

	$scope.saveInvoice = function(vehicle,person,invoice){
		$scope.result = invoiceService.save(vehicle,person,invoice)
		.success(function(successMessage){
			console.log("success")
		})
		.error(function (error) {
			console.log(error)
		});
		
	}



  }]);
