/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('InfoEmpresaCtrl', InfoEmpresaCtrl);

    function InfoEmpresaCtrl($scope) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

    }
})();