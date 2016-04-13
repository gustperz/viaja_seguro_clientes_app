/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('solicitudes')
        .controller('SolicitarGiroCtrl', SolicitarGiroCtrl);

    /* @ngInject */
    function SolicitarGiroCtrl(Solicitud) {
        var vm = this;
        vm.paquete = true;
        Solicitud.data = {};
        vm.solicitud = Solicitud.data;
        Solicitud.data.tipo = 'paquete';
    }
})();
