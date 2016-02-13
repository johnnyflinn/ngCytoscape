(function(){
    'use strict';

    angular
        .module('app')
        .controller('gettingStartedCtrl', gettingStartedCtrl);
    gettingStartedCtrl.$inject = ['$scope', 'cytoData'];
    function gettingStartedCtrl($scope, cytoData){
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
            { group:'edges',data: { id: 'ngToNgCyto', source:'ngCyto', target:'ng' }},
            { group:'edges',data: { id: 'cytoToNgCyto', source:'ngCyto', target:'cyto' }}
        ];
    }
})();