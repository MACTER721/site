import $ from 'jquery';

var map;
var markers = [];
var icons = {};
var features = [];

function initMap() {

	var style = [
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#e9e9e9"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f5f5f5"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 29
				},
				{
					"weight": 0.2
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 18
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#ffffff"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f5f5f5"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#dedede"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#ffffff"
				},
				{
					"lightness": 16
				}
			]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": 36
				},
				{
					"color": "#333333"
				},
				{
					"lightness": 40
				}
			]
		},
		{
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f2f2f2"
				},
				{
					"lightness": 19
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#fefefe"
				},
				{
					"lightness": 20
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#fefefe"
				},
				{
					"lightness": 17
				},
				{
					"weight": 1.2
				}
			]
		}
	];

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: new google.maps.LatLng(54.7527793, 56.0218588),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: style
	});
	
	icons = {
		kids: {
			icon: '../../static/img/content/map/map_mar1.png',
			iconTwo: '../../static/img/content/map/2.png'
		},
		school: {
			icon: '../../static/img/content/map/map_mar2.png',
			iconTwo: '../../static/img/content/map/map_mar1.png'
		},
		magaz: {
			icon: '../../static/img/content/map/map_mar3.png',
			iconTwo: '../../static/img/content/map/map_mar2.png'
		}
	};
	

	features = [
		{
			position: new google.maps.LatLng(54.7527793, 56.0218588),
			type: 'kids'
		},
		{
			position: new google.maps.LatLng(54.7538639, 56.0240367),
			type: 'school'
		},
		{
			position: new google.maps.LatLng(54.7538639, 56.0240367),
			type: 'magaz'
		}
	];

	features.forEach(function(feature) {
		markers.push(
			new google.maps.Marker({
				position: feature.position,
				map: map,
				icon: icons[feature.type].icon
			})
		);

	});
};
google.maps.event.addDomListener(window, "load", initMap);

$(document).ready(function() {
	$('.places-map').hover(
		function () {
			var index = $('.places-map').index(this);
			markers[index].setIcon(icons[features[index].type].iconTwo);
		},
		function () {
			var index = $('.places-map').index(this);
			markers[index].setIcon(icons[features[index].type].icon);
		}
	);
});