/**
 * Created by tav0 on 23/03/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .constant('HOME', 'app.lista_empresas');


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, HOME) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/layout/layout.html'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise( function($injector) {
            var $state = $injector.get("$state");
            $state.go(HOME);
        });
    }
})();
