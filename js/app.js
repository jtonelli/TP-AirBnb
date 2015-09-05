angular.module('tpAirbnApp',['ui.router'])

angular.module('tpAirbnApp').config(function($stateProvider,$urlRouterProvider){

	$stateProvider.state('home', {
	  url: "/home",
	  templateUrl: "templates/home.html",
	  controller:'HomeCtrl'
	})

	$stateProvider.state('resultado', {
	  url: "/resultado?query",
	  templateUrl: "templates/resultado.html",
	  controller:'ResultadoCtrl'
	})

	$urlRouterProvider.otherwise('/home');
})