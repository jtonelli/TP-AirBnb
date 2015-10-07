var map;
var geocoder;

function MyGoogleMapsV2_initialize() {
    map = new GMap2(document.getElementById('map_canvas'));
    map.setCenter(new GLatLng(-36.9835375,-81.6556013), 15);

    // insertar los controles
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());

    geocoder = new GClientGeocoder();
}

function MyGoogleMapsV2_findLocation(address, callback) {
  geocoder.getLocations(address, callback);
}

function MyGMaps_initMapa(coordenadas, address, info) {
	// var coordenadas = {
	// 	Lat: -34.6081947,
	// 	Lng: -58.4796471
	// };

	map = new GMap2(document.getElementById('map_canvas'));

	// insertar los controles
	map.addControl(new GSmallMapControl());
	map.addControl(new GMapTypeControl());

	map.clearOverlays();

	point = new GLatLng(coordenadas.Lat, coordenadas.Lng);

	map.setCenter(point, 14);

	marker = new GMarker(point, {draggable: false});

	map.addOverlay(marker);
	marker.openInfoWindowHtml(info + " - " + address);
}