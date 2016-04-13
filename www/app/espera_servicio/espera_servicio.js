/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';
    angular.module('espera_servicio', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.espera_servicio', {
                    url: '/espera_servicio',
                    templateUrl: 'app/espera_servicio/espera.html',
                    controller: 'EsperaServicioCtrl as vm'
                })
        });

})();
