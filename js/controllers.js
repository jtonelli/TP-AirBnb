var mod = angular.module('tpAirbnApp');

mod.controller('MainCtrl',function($rootScope,$scope, $state){
	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    $scope.stateName = toState.name;
	})
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
		var url = 'http://127.0.0.1:8045/meliproxy?q=' + $stateParams.query;

		$http.get(url).then(function(r){
			console.log(r);
			$scope.resultados = r.data.results;
			$scope.cantResultados = r.data.paging.total;
		});
});