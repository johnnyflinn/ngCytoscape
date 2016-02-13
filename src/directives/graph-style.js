
(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphStyle',graphStyle);

    function graphStyle(){
        var directive = {
            restrict: 'A',
            require: '^cytoscape',
            link: function(scope,elem,attrs,cntrlFn){
                var graph = {};
                cntrlFn._getCytoscapeGraph().then(function(cy){
                    graph = cy;
                });
                var _scope = cntrlFn._getCytoscapeScope();
                _scope.$watch(function(){
                    return _scope.graphStyle;
                }, function(nv,ov){
                    if(nv !== ov){
                        if(graph)
                        graph.style(nv);
                    }
                },true);
            }
        };
        return directive;
    }
})();