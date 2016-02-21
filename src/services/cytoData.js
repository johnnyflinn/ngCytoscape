(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .service('cytoData',cytoData);

    cytoData.$inject = ['cytoHelpers'];
    function cytoData(cytoHelpers){
        var getDefer = cytoHelpers.getDefer,
            getUnresolvedDefer = cytoHelpers.getUnresolvedDefer,
            setResolvedDefer = cytoHelpers.setResolvedDefer;
        var _private = {};
        _private.Graph = {};
        var self = this;

        self.unresolveGraph = function(graphId){
            var id = cytoHelpers.obtainEffectiveGraphId(_private.Graph, graphId);
            _private['Graph'][id] = undefined;
        };

        self.setGraph = function(gObject, scopeId) {
            var defer = getUnresolvedDefer(_private.Graph, scopeId);
            defer.resolve(gObject);
            setResolvedDefer(_private.Graph, scopeId);
        };

        self.getGraph = function(scopeId) {
            var defer = getDefer(_private.Graph, scopeId);
            return defer.promise;
        };
    }
})();