/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular.module('conductor', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.datos_conductor', {
                    url: '/conductor/:conductor_id',
                    templateUrl: 'app/conductor/datos_conductor.html',
                    controller: 'ConductorCtrl as vm'
                })
                .state('app.location_conductor', {
                    url: '/conductor/:conductor_id/geolocation',
                    templateUrl: 'app/conductor/mapa/mapa.html',
                    controller: 'MapaConductorCtrl as vm'
                });
        });
})();
