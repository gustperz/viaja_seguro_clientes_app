// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'angular-jwt',
    '$selectBox',
    'uiGmapgoogle-maps',
    'ngCordova',

    'auth',
    'mapa_ubicacion',
    'empresas',
    'solicitud_vehiculo',
    'solicitud_giropaquete'
])

    .run(function ($ionicPlatform, $rootScope, $state, jwtHelper) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (!to.data || !to.data.noRequiresLogin) {
                var jwt = sessionStorage.getItem('jwt');
                if (!jwt || jwtHelper.isTokenExpired(jwt)) {
                    //e.preventDefault();
                    //$state.go('login');
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, jwtInterceptorProvider,
                      $httpProvider, uiGmapGoogleMapApiProvider) {
        jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');

        $ionicConfigProvider.navBar.alignTitle('center');
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'src/layout/layout.html',
                controller: 'AppCtrl'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

        // angular-google-maps
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            libraries: 'places,geometry,visualization',
            language: 'es'
        });
    })

    //.constant('API_URL', 'http://localhost:8000/api')
    .constant('API_URL', 'http://dev.viajaseguro.co/public/api')

    .constant('$ionicLoadingConfig', {
        templateUrl: 'src/layout/ionicLoading.html',
        noBackdrop: true
    });


function tokenGetter(config, jwtHelper, $http, API_URL) {
    var jwt = sessionStorage.getItem('jwt');
    if(jwt && config.url.indexOf('http://dev.viajaseguro.co/public/api/') === 0){
        if(jwtHelper.isTokenExpired(jwt)){
            return $http({
                url : API_URL+'/new_token',
                skipAuthorization : true,
                method: 'GET',
                headers : { Authorization : 'Bearer '+ jwt}
            }).then(
                function(response){
                    sessionStorage.setItem('jwt',response.data.token);
                    return response.data.token;
                },
                function(response){
                    sessionStorage.removeItem('jwt');
                }
            );
        }else{
            return jwt;
        }
    }
}
