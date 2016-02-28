/**
 * Created by tav0 on 27/02/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .factory('geoLocationService', factory);

    function factory($cordovaGeolocation, uiGmapGoogleMapApi) {
        var posicionActual = {};
        var service = {
            current: current,
            posicionActual: posicionActual
        };
        return service;

        function current() {
            var posOptions = {enableHighAccuracy: true, timeout: 20000, maximumAge: 0};
            var cgeo = $cordovaGeolocation.getCurrentPosition(posOptions);
            return cgeo.then(function(position) {
                    posicionActual.lat = position.coords.latitude;
                    posicionActual.lng = position.coords.longitude;
                    decode(posicionActual);
                    return posicionActual;
                },
                function error(error) {
                    console.log('code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n');
                }
            );
        }

        function decode(pos){
            uiGmapGoogleMapApi.then(function(map) {
                var latlng = new map.LatLng(pos.lat, pos.lng);
                var geocoder = new map.Geocoder();
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    var res = results[0].formatted_address.split(',');
                    pos.direccion =  res[0];
                    pos.ciudad = res[2]+', '+res[3];
                    console.log(pos);
                    return pos;
                });
            });
        }
    }
})();

var asd = {
    "status": "OK",
    "results": [{
        "types": ["street_address"],
        "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
        "address_components": [
            {
                "long_name": "1600",
                "short_name": "1600",
                "types": ["street_number"]
            },
            {
                "long_name": "Amphitheatre Pkwy",
                "short_name": "Amphitheatre Pkwy",
                "types": ["route"]
            },
            {
                "long_name": "Mountain View",
                "short_name": "Mountain View",
                "types": ["locality", "political"]
            },
            {
                "long_name": "California",
                "short_name": "CA",
                "types": ["administrative_area_level_1", "political"]
            },
            {
                "long_name": "United States",
                "short_name": "US",
                "types": ["country", "political"]
            },
            {
                "long_name": "94043",
                "short_name": "94043",
                "types": ["postal_code"]
            }],
        "geometry": {
            "location": {
                "lat": 37.4219720,
                "lng": -122.0841430
            },
            "location_type": "ROOFTOP",
            "viewport": {
                "southwest": {
                    "lat": 37.4188244,
                    "lng": -122.0872906
                },
                "northeast": {
                    "lat": 37.4251196,
                    "lng": -122.0809954
                }
            }
        }
    }]
}
