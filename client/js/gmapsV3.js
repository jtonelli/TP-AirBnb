function MyGMaps_initMap (coordenadas, address, info) {
	// var coordenadas = {
	// 	Lat: -34.6081947,
	// 	Lng: -58.4796471
	// };

	var mapOptions = {
	    zoom: 12,
	    center: new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng),
	    // disableDefaultUI: true,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	var place = new google.maps.LatLng(coordenadas.Lat, coordenadas.Lng);
	var marker = new google.maps.Marker({
	    position: place,
	    title: 'address',
	});

	marker.setMap(map);
	marker.setMap(null);

	var infowindow = new google.maps.InfoWindow({
	    content: 'info' + " - " + 'address'
	});

	infowindow.open(map, marker);

	// Add circle overlay and bind to marker (radius in metres)
	var circle = new google.maps.Circle({
	  map: map,
	  radius: 3000,
	  fillColor: '#48C6D8' //'#AA0000' 
	  // : '#00AA00'
	});

	circle.bindTo('center', marker, 'position');
}

function MyGMaps_GetGeoCod(address, callback) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, callback);
}