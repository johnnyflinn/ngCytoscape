(function(){
    'use strict';

    angular
        .module('app')
        .controller('defaultsCtrl', defaultsCtrl);
    defaultsCtrl.$inject = ['$scope', 'cytoData'];
    function defaultsCtrl($scope, cytoData){
        $scope.switch = function(text){
            if(text === 'HTML'){
                $scope.codeView.html = true;
                $scope.codeView.javascript = false;
            }else{
                $scope.codeView.html = false;
                $scope.codeView.javascript = true;
            }
        };
        $scope.codeView = {
            html:true,
            javascript:false
        };
        $scope.defaults = {
            zoomingEnabled: false,
            userPanningEnabled: false
        };
        $scope.elements = [
            { group:'nodes',data: { id: 'ngCyto', name: 'ngCytoscape', href: 'http://cytoscape.org' } },
            { group:'nodes',data: { id: 'cyto', name: 'Cytoscape.js', href: 'http://js.cytoscape.org' } },
            { group:'nodes',data: { id: 'ng', name: 'Angular.js', href: 'http://js.cytoscape.org' } },
            { data: { id: 'ngToNgCyto', source:'ngCyto', target:'ng' }},
            { data: { id: 'cytoToNgCyto', source:'ngCyto', target:'cyto' }}
        ];
    }
})();