(function(){
    "use strict";
    angular
        .module('ngCytoscape',[])
        .directive('cytoscape',cytoscape);
    cytoscape.$inject=['$q', 'cytoHelpers', 'cytoData', 'cytoGraphDefaults', 'CytoscapeGraph', 'cytoEvents', 'cytoElementsHelpers'];

    function cytoscape($q, cytoHelpers, cytoData, cytoGraphDefaults, CytoscapeGraph, cytoEvents, cytoElementsHelpers){
        ctrlFn.$inject = ['$scope'];

        var directive = {
            restrict: 'EA',
            replace: true,
            scope:{
                graphElements: '=',
                graphLayout: '=',
                graphOptions: '=',
                graphStyle: '='
            },

            template: '<div class="ngCytoscape"></div>',
            controller: ctrlFn,
            link: linkFn
        };
        return directive;

        function ctrlFn($scope){
            this._cytoGraph = $q.defer();
            this._getCytoscapeGraph = function(){
                return this._cytoGraph.promise;
            };
            this._getCytoscapeScope = function(){
                return $scope;
            };
        }
        function linkFn(scope,element,attrs,ctrlFn){
            var isDefined = cytoHelpers.isDefined;
            var isEmpty = cytoHelpers.isEmpty;

            cytoGraphDefaults.setDefaults(scope.graphOptions, scope.graphLayout, attrs.id, scope.graphStyle);
            scope.graphId =  attrs.id;
            var cy = new CytoscapeGraph(element[0], cytoGraphDefaults.getGraphCreationDefaults(attrs.id));
            cytoEvents.setEvents(cy);
            ctrlFn._cytoGraph.resolve(cy);

            if(isDefined(scope.graphElements && !isEmpty(scope.graphElements))){
                cytoElementsHelpers.addElements(scope.graphElements, cy, scope);
                if(isDefined(scope.graphLayout) && !isEmpty(scope.graphLayout)){
                    cy.layout(scope.graphLayout);
                }
            }

            scope.$watch(function(){
                return element[0].offsetHeight;
            }, function(nv,ov){
                if(nv !== ov){
                    cy.resize();
                }
            });
            scope.$watch(function(){
                return element[0].offsetWidth;
            }, function(nv,ov){
                if(nv !== ov){
                    cy.resize();
                }
            });

             cy.ready(function() {
                cytoData.setGraph(cy, attrs.id);
            });

        }
    }
})();