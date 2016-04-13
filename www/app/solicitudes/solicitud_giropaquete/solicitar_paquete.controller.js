/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('solicitudes')
        .controller('SolicitarPaqueteCtrl', SolicitarPaqueteCtrl);

    /* @ngInject */
    function SolicitarPaqueteCtrl(Solicitud) {
        var vm = this;
        vm.paquete = true;
        Solicitud.data = {};
        vm.solicitud = Solicitud.data;
        Solicitud.data.tipo = 'paquete';
    }
})();
