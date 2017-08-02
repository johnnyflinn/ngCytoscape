(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphExtensions', graphExtensions);
    graphExtensions.$inject = ['cytoGraphDefaults', 'cytoHelpers'];
    function graphExtensions(cytoGraphDefaults, cytoHelpers){
        var directive = {
            restrict: 'A',
            require: '^cytoscape',
            link: function(scope, elem, attrs, cntrlFn){
                var graph = {};
                cntrlFn._getCytoscapeGraph().then(function(cy){
                    graph = cy;
                });
                var _scope = cntrlFn._getCytoscapeScope();
                _scope.$watchCollection(function(){
                    return _scope.graphExtensions;
                }, function(nv,ov){
                    if(nv !== ov){
                        if(graph) {
                            //graph.style(nv);
                            var defaults = cytoGraphDefaults.getDefaults(attrs.id);
                            if (isDefined(defaults.extensions)) {
                                angular.forEach(defaults.extensions, function(ele, index){
                                    //graph[ele.extension](ele.options);
                                    cytoHelpers.executeFunctionByName(ele.extension, graph, ele.options);
                                });
                            }
                        }
                    }
                },true);
            }
        };
        return directive;
    }
})();