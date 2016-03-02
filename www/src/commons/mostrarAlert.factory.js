/**
 * Created by tav0 on 1/03/16.
 */

(function() {
    'use strict';

    angular
        .module('starter')
        .factory('mostarAlert', function($ionicPopup){
            return mostarAlert;
            function mostarAlert(titulo,contenido){
                var alertPopup = $ionicPopup.alert({
                    title: titulo,
                    template: contenido
                });
                alertPopup.then(function (res) {
                });
            }
        });

})();
