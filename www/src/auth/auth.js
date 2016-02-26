/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';
    angular.module('auth', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/auth/login.html',
                    controller: 'LoginCtrl as vm',
                    data: {
                        noRequiresLogin: true
                    }
                })
                .state('register', {
                    url: '/regitrarse',
                    templateUrl: 'src/auth/registrarse.html',
                    controller: 'RegisterCtrl as vm',
                    data: {
                        noRequiresLogin: true
                    }
                })
        });
})();
