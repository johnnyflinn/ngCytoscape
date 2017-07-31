
(function(){
    'use strict';

    angular
        .module('ngCytoscape')
        .factory('CytoscapeGraph', CytoscapeGraph);

    function CytoscapeGraph(){
        var CytoscapeGraph =  function(element, defaults, styles){
            var cyObj = {
                container:element
            };
            if(angular.isDefined(defaults) && defaults !== null){
                angular.extend(cyObj,defaults);
            }
            return cytoscape(cyObj);
        };
        return CytoscapeGraph;
    }
})();