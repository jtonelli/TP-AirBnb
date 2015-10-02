function iniciarmapa() {
	
	// var coordenadas = {
	// 	Lat: 0,
	// 	Lng: 0
	// };
	
	var coordenadas = {
		Lat: -34.6081947,
		Lng: -58.4796471
	};

	function localizacion (posicion) {
		// coordenadas = {
		// 	Lat: posicion.coords.latitude,
		// 	Lng: posicion.coords.longitude
		// }
		
		//informacion(coordenadas);
		
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng),
			// disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		
		var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
		
		var infowindow = new google.maps.InfoWindow({
			map: map,
			position: new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng),
			content: 'Ubicacion del Depto.'
        });

        var place = new google.maps.LatLng(-34.623876, -58.417677);
		var marker = new google.maps.Marker({
	        position: place
	        , title: 'Un Lugar'
	        , map: map
        });
	}
	
	function errores (error) {
		alert('Ha ocurrido un error al intentar obtener la información');
	}
	
	localizacion(coordenadas);

	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(localizacion,errores);
	// } else {
	// 	alert("Tu navegador no soporta o no tiene habilitada la 'Geolocalización'");
	// }
}