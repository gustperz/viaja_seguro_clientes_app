(function() {
    'use strict';

    angular.module('mapa_ubicacion', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.mapa_midireccion', {
                    url: '/midireccion',
                    templateUrl: 'app/mapa_ubicacion/mapa.html',
                    controller: 'MapaMiDireccionCtrl as vm'
                })
        });
})();
