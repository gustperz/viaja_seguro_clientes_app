(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config($ionicConfigProvider, uiGmapGoogleMapApiProvider) {
        
        $ionicConfigProvider.navBar.alignTitle('center');

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyD8gtDlGWJypAdXEAgLkhFagYceRve5Rz4',
            libraries: 'places,geometry,visualization',
            language: 'es'
        });
    }
})();