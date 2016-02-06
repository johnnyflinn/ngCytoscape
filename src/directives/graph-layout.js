(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphLayout', graphLayout);
    graphLayout.$inject = ['cytoHelpers', 'cytoLayoutDefaults'];
    function graphLayout(cytoHelpers, cytoLayoutDefaults){
        var directive = {
            restrict: 'A',
            require: '^cytoscape',
            link:linkFn
        };
        return directive;

        function linkFn(scope,element,attrs,controller){
            var isDefined = cytoHelpers.isDefined;
            var defaultLayouts = cytoLayoutDefaults.getDefaultLayouts();
            var defaultLayout = defaultLayouts['grid'];
            var graph, _scope;

            _scope = controller._getCytoscapeScope();
            controller._getCytoscapeGraph().then(function(cy){
                graph = cy;
            });
            scope.$watch(function(){
                return _scope.graphLayout;
            }, function(nv,ov){
                if(nv != ov && graph.elements().length > 0){
                    graph.elements(':visible').layout(_scope.graphLayout || defaultLayout);
                }
            },true);
        }
    }

})();