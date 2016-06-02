(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphElements', graphElements);

    graphElements.$inject = ['cytoHelpers', 'cytoElementsHelpers'];
    function graphElements(cytoHelpers, cytoElementsHelpers){
        var directive = {
            restrict: 'A',
            require: '^cytoscape',
            link:linkFn
        };
        return directive;

        function linkFn(scope,elements,attrs,controller){
            var _scope = controller._getCytoscapeScope();
            var isDefined = cytoHelpers.isDefined;
            var graph;
            controller._getCytoscapeGraph().then(function(cy){
                graph = cy;
            });
            scope.$watch(function(){
                return _scope.graphElements;
            }, function(nv,ov){
                if(isDefined(nv) && nv !== ov){
                    cytoElementsHelpers.processChange(nv, ov, graph,_scope);
                }
            },true);
        }
    }
})();
