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
	//    	Lat: -34.709616,
	//    	Lng: -58.368989
	//    };

	// MyGMaps_initMap(coordenadas, 'Ayacucho 2500', 'La casa de Juan');

	var url = 'http://localhost:3000/Apartments/' + $stateParams.query;

	console.log(url);

	$http.get(url).then(function(r){
		console.log('OK');
		$scope.resultado = r.data;
		console.log('================');
		console.log(r.data.address.coor.coordinates);
		MyGMaps_initMap(r.data.address.coor.coordinates, r.data.address.fullAdress, r.data.title);
	});

	$scope.reservarDepto = function(apartmentId){
		var urlReserva = 'http://localhost:3000/Reservations/';
		var data = {
			startDate: $scope.fechaDesde,
			endDate: $scope.fechaHasta,
		}

		$http.post(urlReserva, data).then(function(r){
			console.log(r);
			$scope.resultado = r;
			alert('Reserva OK');
		});
	}
});

mod.controller('PublicacionesCtrl',function($scope,$http,$state){
	var url = 'http://localhost:3000/Apartments/myApartments/';

	// rsliderInit("#" + "slider4");
 
	$scope.init = function () {
		$scope.loading = true;

		$http.get(url).then(function(r){
			console.log(r);
			$scope.resultados = r.data;

			var i;
			function uploader(i) {
				if( i < $scope.resultados.length ) {
			  		$scope.resultados[i].sliderId = "slider" + (i+1);
			  		// rsliderInit("#" + $scope.resultados[i].sliderId);
					uploader(i+1);

				} else{
					console.log('Todo OK');
					$scope.$broadcast('dataloaded');
				}
			}
			uploader(0);
			// $scope.$broadcast('dataloaded');
		});
	};
 
	$scope.init();

	// $http.get(url).then(function(r){
	// 	console.log(r);
	// 	$scope.resultados = r.data;

	// 	var i;
	// 	function uploader(i) {
	// 		if( i < $scope.resultados.length ) {
	// 	  		$scope.resultados[i].sliderId = "slider" + (i+1);
	// 	  		// rsliderInit("#" + $scope.resultados[i].sliderId);
	// 			uploader(i+1);

	// 		} else{
	// 			console.log('Todo OK');
	// 			$scope.$broadcast('dataloaded');
	// 		}
	// 	}
	// 	uploader(0);
	// 	// $scope.$broadcast('dataloaded');
	// });

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

mod.directive('collapseElem', ['$timeout', function ($timeout) {
  return {
    link: function ($scope, element, attrs) {
    	console.log('directiva');
      $scope.$on('dataloaded', function () {
        $timeout(function () { 
        	// console.log($scope.resultados.length);
          	for (var i = 0; i < $scope.resultados.length; i++) {
            	console.log("Hello world!" + i);
            	rsliderInit("#" + $scope.resultados[i].sliderId);
            }
        }, 0, false);
      })
    }
  };
}]);

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
					Lat: results[0].geometry.location.lat(),
					Lng: results[0].geometry.location.lng()
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