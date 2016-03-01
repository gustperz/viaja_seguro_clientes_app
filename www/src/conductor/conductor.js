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
                    templateUrl: 'src/conductor/datos_conductor.html',
                    controller: 'ConductorCtrl as vm'
                });
        });
})();
