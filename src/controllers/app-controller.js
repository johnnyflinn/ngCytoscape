(function(){
    'use strict';
    angular
        .module('app')
        .controller('appCntrl', appCntrl);
    appCntrl.$inject = ['$scope', 'cytoData', '$interval'];

    function appCntrl($scope, cytoData, $interval){
        cytoData.getGraph('jumbo-graph').then(function(graph){
            $scope.graph = graph;
        });

        var layouts = [
            {name:'grid', animate: true},
            {name:'circle', animate: true},
            {name:'cose', animate: true},
            {name:'concentric', animate: true},
            {name:'breadthfirst', animate: true},
            {name:'random', animate: true}
        ];

        var runLayouts;
        runLayouts = $interval(function(){
            var ran = Math.floor(Math.random() * 4);
            $scope.layout = layouts[ran];
        },10000);
         $scope.style =[
         {
             selector: 'node',
             style: {
                 'content': 'data(name)',
                 'text-valign': 'center',
                 'color': 'white',
                 'text-outline-width': 2,
                 'text-outline-color': '#888'
             }
         }];

        $scope.elements = [
            { group:'nodes',data: { id: 'ngCyto', name: 'ngCytoscape', href: 'http://cytoscape.org' } },
            { group:'nodes',data: { id: 'cyto', name: 'Cytoscape.js', href: 'http://js.cytoscape.org' } },
            { group:'nodes',data: { id: 'ng', name: 'Angular.js', href: 'http://js.cytoscape.org' } },
            { group:'edges',data: { id: 'ngToNgCyto', source:'ngCyto', target:'ng' }},
            { group:'edges',data: { id: 'cytoToNgCyto', source:'ngCyto', target:'cyto' }}
        ];
        $scope.layout = {name:'cose'};

        }
})();
