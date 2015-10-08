var mod = angular.module('tpAirbnApp');

mod.controller('MainCtrl',function($rootScope,$scope, $state){
	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    $scope.stateName = toState.name;
	});

	$scope.validarYBuscar = function(){
		$scope.error = '';

		if($scope.query.length < 4){
			$scope.error = 'Ingrese mas de 4 caracteres para inicar la busqueda';
		}else{
			$state.go('resultado',{
				query:$scope.query
			});
		}
	}

	$scope.mostrarSeccion = function(nombreSeccion){	
		$state.go(nombreSeccion);
	}
});

mod.controller('HomeCtrl',function($scope, $state){
	$scope.validarYBuscar = function(){
		$scope.error = '';

		if($scope.query.length < 4){
			$scope.error = 'Ingrese mas de 4 caracteres para inicar la busqueda';
		}else{
			$state.go('resultado',{
				query:$scope.query
			});
		}
	}
});

mod.controller('ResultadoCtrl',function($scope,$stateParams,$http){
	// var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + $stateParams.query + '&limit=10';
	var url = 'http://127.0.0.1:8054/meliproxy?q=' + $stateParams.query;

	$http.get(url).then(function(r){
		console.log(r);
		$scope.resultados = r.data.results;
		$scope.cantResultados = r.data.paging.total;
	});
});

mod.controller('LoginCtrl',function($scope,$http,$state,$localStorage){
	$scope.loginConValidacion = function(){
		var url = 'http://localhost:3000/users/auth/?email=' + $scope.email + '&password=' + $scope.pass;

		$http.get(url).then(function(r){
			$localStorage.token = r.data.token;
			console.log(r);
			console.log($localStorage.token);
			$scope.resultado = r;
			$state.go('home');
		});
	}
});

mod.controller('RegistroCtrl',function($scope,$http,$state){

	$scope.registroConValidacion = function(){
		var url = 'http://localhost:3000/Users/';
		var data = {
			email: $scope.email,
			password: $scope.pass,
		}

		$http.post(url, data).then(function(r){
			console.log(r);
			$scope.resultado = r;
			$state.go('loing');
		});
	}
});

mod.controller('RecuperarPassCtrl',function($scope,$http,$state){

});

mod.controller('PublicacionesDetCtrl',function($scope,$http,$state,$stateParams){
	
	// var coordenadas = {
	// 	Lat: -34.6081947,
	// 	Lng: -58.4796471
	// };

	var coordenadas = {
    	Lat: -34.709616,
    	Lng: -58.368989
    };

	MyGMaps_initMap(coordenadas, 'Ayacucho 2500', 'La casa de Juan');

	// var url = 'http://localhost:3000/Apartments/' + $stateParams.query;

	// $http.get(url).then(function(r){
	// 	console.log(r);
	// 	$scope.resultado = r.data;
	// 	console.log('================');
	// 	console.log(r.data.address.coor.coordinates);
	// 	iniciarmapa();
	// });

	// $scope.reservarDepto = function(apartmentId){
	// 	var urlReserva = 'http://localhost:3000/Reservations/';
	// 	var data = {
	// 		startDate: $scope.fechaDesde,
	// 		endDate: $scope.fechaHasta,
	// 	}

	// 	$http.post(urlReserva, data).then(function(r){
	// 		console.log(r);
	// 		$scope.resultado = r;
	// 		alert('Reserva OK');
	// 	});
	// }
});

mod.controller('PublicacionesCtrl',function($scope,$http,$state){
	var url = 'http://localhost:3000/Apartments/myApartments/';

	$http.get(url).then(function(r){
		console.log(r);
		$scope.resultados = r.data;
	});

	$scope.verDetallePub = function(apartmentId){
		$state.go('publicacionesDet',{
			query: apartmentId
		});
	}

	$scope.modificarPub = function(apartmentId){
		$state.go('publicar',{
			query: apartmentId
		});
	}

	$scope.eliminarPub = function(apartmentId){
		var urlDelete = 'http://localhost:3000/Apartments/' + apartmentId;

		$http.delete(urlDelete).then(function(r){
			console.log(r);
			$scope.deleteResult = r;
			alert('delete OK');
		});
	}
});

mod.controller('PublicarCtrl',function($scope,$http,$state,$stateParams,$localStorage){

	$scope.token = $localStorage.token;

	$scope.direccion = {
	  FullAdress: '',
	  Lat: 0,
	  Lng: 0
	};

	$scope.direccion.FullAdress = 'zepita 3251, capital federal';

	// MyGMaps_GeoCodInit();

	$scope.buscarDireccion = function(){

		MyGMaps_GetGeoCod($scope.direccion.FullAdress, function (results, status) {

			if (status === google.maps.GeocoderStatus.OK) {

				$scope.direccion = {
					FullAdress: results[0].formatted_address,
					Lat: results[0].geometry.location.H,
					Lng: results[0].geometry.location.L
				};
		    } else {
				$scope.direccion = {
					FullAdress: '',
					Lat: 0,
					Lng: 0
				};
		    	alert('Direccion erronea. Error: ' + status);
		    }

			//??????????????????????
			$scope.$apply();
		});
	}

    $scope.dropzoneReset = function() {
        $scope.resetDropzone();
    };

	$scope.publicarDepto = function(){
		
		$scope.myDropzone.options.url = 'http://localhost:3000/Apartments/';

		var data = {
			title: $scope.titulo,
			description: $scope.descripcion,
			address:{ 
				fullAdress:$scope.direccion.FullAdress, 
				coor:{
           			type:"Point",
           			coordinates:[$scope.direccion.Lat, $scope.direccion.Lng]
       			}
			}
		}

		$scope.formDataKeyStr = 'apartment';
		$scope.formDataValueStr = JSON.stringify(data);

		// $http.post(url, data).then(function(r){
		// 	console.log(r);
		// 	$scope.resultado = r;
		// 	$state.go('publicaciones');
		// });

		$scope.processDropzone();
	}

    $scope.uploadCallback = function(file, response) {
    	console.log(response);
        $state.go('publicaciones');
    };

});