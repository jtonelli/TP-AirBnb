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

	$stateProvider.state('login', {
	  url: "/login",
	  templateUrl: "templates/login.html",
	  controller:'LoginCtrl'
	})

	$stateProvider.state('registro', {
	  url: "/registro",
	  templateUrl: "templates/registrarse.html",
	  controller:'RegistroCtrl'
	})

	$stateProvider.state('recuperarPassword', {
	  url: "/recuperarPassword",
	  templateUrl: "templates/recuperarPassword.html",
	  controller:'RecuperarPassCtrl'
	})

	$urlRouterProvider.otherwise('/home');
});