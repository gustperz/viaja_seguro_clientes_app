/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .controller('AppCtrl', AppCtrl);

    function AppCtrl($ionicModal) {
        var vm = this;

        $ionicModal.fromTemplateUrl('src/auth/login.html', {})
            .then(function(modal) {
                vm.modal = modal;
                isAuthenticated();
            });

        function isAuthenticated(){
            if(!sessionStorage.getItem('jwt')){
                vm.modal.show();
            }
        }

    }
})();
