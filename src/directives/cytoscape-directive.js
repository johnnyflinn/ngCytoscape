/**!
 * The MIT License
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/*!
 *  ngCytoscape v1.0  2016-02-13
 *  ngCytoscape - An AngularJS directive to easily interact with cytoscape
 *  git: https://github.com/johnnyflinn/ngCytoscape
 */
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
                graphStyle: '=',
                graphReady: '=',
                graphExtensions: "="
            },
            template: '<div class="ngCytoscape"></div>',
            controller: ctrlFn,
            link: linkFn
        };
        return directive;

        function ctrlFn($scope){
            /* jshint ignore:start */
            this._cytoGraph = $q.defer();
            this._getCytoscapeGraph = function(){
                return this._cytoGraph.promise;
            };
            this._getCytoscapeScope = function(){
                return $scope;
            };
            /* jshint ignore:end */
        }
        function linkFn(scope,element,attrs,ctrlFn){
            var isDefined = cytoHelpers.isDefined;
            var isEmpty = cytoHelpers.isEmpty;
            cytoGraphDefaults.setDefaults(scope.graphOptions, scope.graphLayout, attrs.id, scope.graphStyle, scope.graphExtensions);
            scope.graphId =  attrs.id;
            var cy = new CytoscapeGraph(element[0], cytoGraphDefaults.getGraphCreationDefaults(attrs.id));
            cytoEvents.setEvents(cy);
            ctrlFn._cytoGraph.resolve(cy);

            if(isDefined(scope.graphElements && !isEmpty(scope.graphElements))){
                cytoElementsHelpers.addAllElements(scope.graphElements, cy, scope);
                if(isDefined(scope.graphLayout) && !isEmpty(scope.graphLayout)){
                    cy.layout(scope.graphLayout);
                }
            }

            if (isDefined(scope.graphExtensions)) {
                angular.forEach(scope.graphExtensions, function(ele, index){
                    // cy[ele.extension](ele.options);
                    cytoHelpers.executeFunctionByName(cy[ele.extension], ele.options);
                });
            }

            if(isDefined(scope.graphReady)){
              cy.ready(scope.graphReady);
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
            scope.$on('$destroy', function(){
                cy.destroy();
                cytoData.unresolveGraph(attrs.id);
            });

        }
    }
})();
