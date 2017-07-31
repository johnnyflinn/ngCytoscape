
(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphExtensions', graphExtensions);
    graphExtensions.$inject = ['cytoGraphDefaults'];
    function graphExtensions(cytoGraphDefaults){
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
                    return _scope.graphExtensions;
                }, function(nv,ov){
                    if(nv !== ov){
                        if(graph) {
                            //graph.style(nv);
                            var defaults = cytoGraphDefaults.getDefaults(attrs.id);
                            if (isDefined(defaults.extensions)) {
                                angular.forEach(defaults.extensions, function(ele, index){
                                    graph[ele.extenstion](ele.options);
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