/**!
 * The MIT License
 *
 * Copyright (c) 2013 the angular-leaflet-directive Team, http://tombatossals.github.io/angular-leaflet-directive
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
 * angular-leaflet-directive
 * https://github.com/tombatossals/angular-leaflet-directive
 *
 * @authors https://github.com/tombatossals/angular-leaflet-directive/graphs/contributors
 */

/*!
 *  ngCytoscape  2016-02-13
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
(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .directive('graphElements', graphElements);

    graphElements.$inject = ['cytoHelpers', 'cytoElementsHelpers'];
    function graphElements(cytoHelpers, cytoElementsHelpers){
        var directive = {
            restric: 'A',
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
            scope.$watchCollection(function(){
                return _scope.graphElements;
            }, function(nv,ov){
                if(isDefined(nv) && nv !== ov){
                    cytoElementsHelpers.processChange(nv,graph,_scope);
                }
            });

            scope.$watch(watchNodeList, function (nv) {
                if(nv && nv.length > 0)
                if(graph)
                graph.style().update();
            },true);
            function watchNodeList() {
                return scope.elements.map(nodeMap);
            }
            function nodeMap (node) {
                return node.data;
            }



        }
    }
})();
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
            /* jshint ignore:start */
            var defaultLayout = defaultLayouts['grid'];
            /* jshint ignore:end */
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

(function(){
    'use strict';

    angular
        .module('ngCytoscape')
        .factory('CytoscapeGraph', CytoscapeGraph);

    function CytoscapeGraph(){
        var CytoscapeGraph =  function(element,defaults, styles){
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

(function() {
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoElementsHelpers', cytoElementsHelpers);
    cytoElementsHelpers.$inject = ['cytoHelpers', '$log'];
    function cytoElementsHelpers(cytoHelpers, $log) {
        var service = {
            initElements: _initElements,
            addElements: _addElements,
            processChange:_processChange
        };
        return service;
        function _initElements(elements, graph, scope) {
            //Add Elements To Graph
            for(var i in elements){
                var element = elements[i];
                if(element.group === 'nodes' || element.group === 'edges'){
                    _addElement(element,graph,scope);
                }
            }
        }
        function _processChange(newElements, graph, _scope) {
            if (newElements.length === 0) {
                graph.nodes().forEach(function (ele) {
                    graph.remove(ele);
                });
            }
            if (graph.elements().length === 0) {
                _addElements(newElements, graph, _scope);

            } else {
                var graphIndex = {};
                var newElementIndex = {};
                graph.elements().each(function (i, ele) {
                    graphIndex[ele.id()] = 1;
                });
                //To Add
                var toAdd = [];
                cytoHelpers.asyncEach(newElements, function (ele, index) {

                    newElementIndex[ele.data.id] = ele.data.id;
                    if (ele.data && ele.data.id) {
                        if (graphIndex[ele.data.id]) {
                            //Check if cytoscape element data matches newElement data
                            var cytoElem = graph.nodes('#' + ele.data.id);
                            if (cytoElem.data() !== ele.data) {
                                cytoElem.data(ele.data);
                            }
                        } else {
                            //It's new
                            toAdd.push(ele);
                        }
                        //No ID.  Add It
                    } else {
                        toAdd.push(ele);
                    }
                }).then(function () {
                    if (toAdd.length === 0) {
                        //Must be removing something
                        graph.elements().each(function (i, ele) {
                            if (!newElementIndex[ele.id()]) {
                                var removeEleEdges = ele.neighborhood('edge').jsons();
                                var removeEdgeIndex = {};
                                angular.forEach(removeEleEdges, function (edge, i) {
                                    removeEdgeIndex[edge.data.id] = edge.data.id;
                                });
                                for (var ind = newElements.length; ind--;) {
                                    if (removeEdgeIndex[newElements[ind].data.id]) {
                                        newElements.splice(ind, 1);
                                    }
                                }
                                graph.remove('#' + ele.id());
                            }
                        });
                    } else {
                        graph.add(toAdd);
                    }
                    graph.style().update();
                    graph.elements(':visible').layout(_scope.graphLayout || {name: 'grid'});
                    graph.resize();
                });
            }
        }
        function _addElements(elements,graph,_scope){
            if(areValidElements(elements)){
                graph.add(elements);
                graph.elements(':visible').layout(_scope.graphLayout || {name: 'grid'});
            }
        }
        function areValidElements(nv){
            var nodeIndex = {};
            var cleanElements = [];
            var errors = 0;
            angular.forEach(nv,function(ele,i){
                if(!ele.hasOwnProperty('data')){
                    errors ++;
                    $log.error('Elements require a data property');
                }else if(!ele.data.hasOwnProperty('id')){
                    errors ++;
                    $log.error('Elements require an id property');
                }else{
                    cleanElements.push(ele);
                    if(ele.group === 'nodes'){
                        nodeIndex[ele.data.id] = ele.data.id;
                    }
                }
            });
            angular.forEach(cleanElements, function(ele){
                if(ele.group !== 'nodes'){
                    if(!ele.data.hasOwnProperty('target')){
                        errors ++;
                        $log.error('Edges require a target', ele.data);
                    }
                    if(!ele.data.hasOwnProperty('source')){
                        errors ++;
                        $log.error('Edges require a source', ele.data);
                    }
                    if(!nodeIndex[ele.data.target]){
                        errors ++;
                        $log.error('Edges require a target node.', ele.data);
                    }
                    if(!nodeIndex[ele.data.source]){
                        errors ++;
                        $log.error('Edges require a source node.', ele.data);
                    }
                }
            });
            if(errors > 0){
                return false;
            }else{
                return true;
            }

        }
    }
})();
(function () {
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoEvents', cytoEvents);
    cytoEvents.$inject = ['$rootScope', '$timeout'];
    function _getAllEvents() {
        return [
            'mousedown', // when the mouse button is pressed
            'mouseup', //when the mouse button is released
            'click', //after mousedown then mouseup
            'mouseover', //when the cursor is put on top of the target
            'mouseout', //when the cursor is moved off of the target
            'mousemove', //when the cursor is moved somewhere on top of the target
            'touchstart', //when one or more fingers starts to touch the screen
            'touchmove', //when one or more fingers are moved on the screen
            'touchend', //when one or more fingers are removed from the screen
            'add', //when an element is added to the graph
            'remove', //when an element is removed from the graph
            'select', //when an element is selected
            'unselect', //when an element is unselected
            'lock', // when an element is locked
            'unlock', //when an element is unlocked
            'grab', //when an element is grabbed by the mouse cursor or a finger on a touch input
            'drag', //when an element is grabbed and then moved
            'free', //when an element is freed (i.e. let go from being grabbed)
            'position', //when an element changes position
            'data', //when an element's data is changed
            'scratch', //when an element's scratchpad data is changed
            'style', // when an element's style is changed
            'layoutstart', //when a layout starts running
            'layoutready', //when a layout has set initial positions for all the nodes (but perhaps not final positions)
            'layoutstop', //when a layout has finished running completely or otherwise stopped running
            'load', //when a new graph is loaded via initialisation or cy.load()
            'ready', //when a new instance of Cytoscape.js is ready to be interacted with
            'initrender', //when the first frame is drawn by the renderer (useful for synchronising with image exports etc)
            'done', //when a new instance of Cytoscape.js is ready to be interacted with and its initial layout has finished running
            'pan', //when the viewport is panned
            'zoom', //when the viewport is zoomed
            'tapstart', //or vmousedown : normalised tap start event (either mousedown or touchstart)
            'tapdrag',// or vmousemove : normalised move event (either touchmove or mousemove)
            'tapdragover',// : normalised over element event (either touchmove or mousemove/mouseover)
            'tapdragout',// : normalised off of element event (either touchmove or mousemove/mouseout)
            'tapend',// or vmouseup : normalised tap end event (either mouseup or touchend)
            'tap',// or vclick : normalised tap event (either click, or touchstart followed by touchend without touchmove)
            'taphold',// : normalised tap hold event
            'cxttapstart',// : normalised right-click mousedown or two-finger tapstart
            'cxttapend',// : normalised right-click mouseup or two-finger tapend
            'cxttap',// : normalised right-click or two-finger tap
            'cxtdrag',// : normalised mousemove or two-finger drag after cxttapstart but before cxttapend
            'cxtdragover',// : when going over a node via cxtdrag
            'cxtdragout'// : when going off a node via cxtdrag
        ];
    }
    function cytoEvents($rootScope) {
        var factory = {
            setEvents: setEvents
        };
        return factory;

        function setEvents(cy) {
            var events = _getAllEvents();
            for (var i = 0; i < events.length; i++) {
                cy.on(events[i],function(evt) {
                    if (evt.cyTarget === cy){
                        var graph = evt.cyTarget;
                        $rootScope.$broadcast('cy:graph:' + evt.type, evt);
                    }else{
                        $rootScope.$broadcast('cy:core:' + evt.type, evt);
                    }
                });
                cy.on(events[i], 'node', function (evt) {

                    $rootScope.$broadcast('cy:node:' + evt.type, evt);
                });
                cy.on(events[i], 'edge', function (evt) {
                    var edge = evt.cyTarget;
                    $rootScope.$broadcast('cy:edge:' + evt.type, evt);
                });
            }
        }

    }
})();

(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoGraphDefaults', cytoGraphDefaults);

    cytoGraphDefaults.$inject = ['cytoHelpers'];
    function _getDefaults(){
        return{
            zoom: 1,
            pan: { x: 0, y: 0 },
            minZoom: 1e-50,
            maxZoom: 1e50,
            zoomingEnabled: true,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false,
            selectionType: 'single',
            touchTapThreshold: 8,
            desktopTapThreshold: 4,
            autolock: false,
            autoungrabify: false,
            autounselectify: false,


            // rendering options:
            headless: false,
            styleEnabled: true,
            hideEdgesOnViewport: false,
            hideLabelsOnViewport: false,
            textureOnViewport: false,
            motionBlur: false,
            motionBlurOpacity: 0.2,
            wheelSensitivity: 1,
            pixelRatio: 1
        };
    }
    function cytoGraphDefaults(cytoHelpers){
        var isDefined = cytoHelpers.isDefined;
        var isObject = cytoHelpers.isObject;
        var obtainEffectiveGraphId = cytoHelpers.obtainEffectiveGraphId;
        var defaults = {};

        var factory = {
            getDefaults:getDefaults,
            getGraphCreationDefaults:getGraphCreationDefaults,
            setDefaults:setDefaults,
            reset: function(){
                defaults = {};
            }
        };
        return factory;

        function getDefaults(scopeId){
            var graphId = obtainEffectiveGraphId(defaults, scopeId);
            return defaults[graphId];
        }

        function getGraphCreationDefaults(scopeId){
            var graphId = obtainEffectiveGraphId(defaults, scopeId);
            var d = defaults[graphId];

            var graphDefaults = {
                zoom: d.zoom,
                pan: d.pan,
                minZoom: d.minZoom,
                maxZoom: d.maxZoom,
                zoomingEnabled: d.zoomingEnabled,
                userZoomingEnabled: d.userZoomingEnabled,
                panningEnabled: d.panningEnabled,
                userPanningEnabled: d.userPanningEnabled,
                boxSelectionEnabled: d.boxSelectionEnabled,
                selectionType: d.selectionType,
                touchTapThreshold: d.touchTapThreshold,
                desktopTapThreshold: d.desktopTapThreshold,
                autolock: d.autolock,
                autoungrabify: d.autoungrabify,
                autounselectify: d.autounselectify,
                layout: d.layout,
                style: d.style,

                // rendering options:
                headless: d.headless,
                styleEnabled: d.styleEnabled,
                hideEdgesOnViewport: d.hideEdgesOnViewport,
                hideLabelsOnViewport: d.hideLabelsOnViewport,
                textureOnViewport: d.textureOnViewport,
                motionBlur: d.motionBlur,
                motionBlurOpacity: d.motionBlurOpacity,
                wheelSensitivity: d.wheelSensitivity,
                pixelRatio: d.pixelRatio
            };

            return graphDefaults;
        }

        function setDefaults(userDefaults, userLayout, scopeId, userStyle) {
            var newDefaults = _getDefaults();
            if (isDefined(userDefaults)) {
                newDefaults.zoom = isDefined(userDefaults.zoom) ? userDefaults.zoom : newDefaults.zoom;
                newDefaults.scrollWheelZoom = isDefined(userDefaults.scrollWheelZoom) ? userDefaults.scrollWheelZoom : newDefaults.doubleClickZoom;
                newDefaults.minZoom = isDefined(userDefaults.minZoom) ? userDefaults.minZoom : newDefaults.minZoom;
                newDefaults.maxZoom = isDefined(userDefaults.maxZoom) ? userDefaults.maxZoom : newDefaults.maxZoom;
                newDefaults.zoomingEnabled = isDefined(userDefaults.zoomingEnabled) ? userDefaults.zoomingEnabled : newDefaults.zoomingEnabled;
                newDefaults.panningEnabled = isDefined(userDefaults.panningEnabled) ? userDefaults.panningEnabled : newDefaults.panningEnabled;
                newDefaults.userPanningEnabled = isDefined(userDefaults.userPanningEnabled) ? userDefaults.userPanningEnabled : newDefaults.userPanningEnabled;
                newDefaults.boxSelectionEnabled = isDefined(userDefaults.boxSelectionEnabled) ? userDefaults.boxSelectionEnabled : newDefaults.boxSelectionEnabled;
                newDefaults.selectionType = isDefined(userDefaults.selectionType) ? userDefaults.selectionType : newDefaults.selectionType;
                newDefaults.touchTapThreshold = isDefined(userDefaults.touchTapThreshold) ? userDefaults.touchTapThreshold : newDefaults.touchTapThreshold;
                newDefaults.desktopTapThreshold = isDefined(userDefaults.desktopTapThreshold) ? userDefaults.desktopTapThreshold : newDefaults.desktopTapThreshold;
                newDefaults.autolock = isDefined(userDefaults.autolock) ? userDefaults.autolock : newDefaults.autolock;
                newDefaults.autoungrabify = isDefined(userDefaults.autoungrabify) ? userDefaults.autoungrabify : newDefaults.autoungrabify;
                newDefaults.headless = isDefined(userDefaults.headless) ? userDefaults.headless : newDefaults.headless;
                newDefaults.styleEnabled = isDefined(userDefaults.styleEnabled) ? userDefaults.styleEnabled : newDefaults.styleEnabled;
                newDefaults.hideEdgesOnViewport = isDefined(userDefaults.hideEdgesOnViewport) ? userDefaults.hideEdgesOnViewport : newDefaults.hideEdgesOnViewport;
                newDefaults.hideLabelsOnViewport = isDefined(userDefaults.hideLabelsOnViewport) ? userDefaults.hideLabelsOnViewport : newDefaults.hideLabelsOnViewport;
                newDefaults.textureOnViewport = isDefined(userDefaults.textureOnViewport) ? userDefaults.textureOnViewport : newDefaults.textureOnViewport;
                newDefaults.motionBlur = isDefined(userDefaults.motionBlur) ? userDefaults.motionBlur : newDefaults.motionBlur;
                newDefaults.motionBlurOpacity = isDefined(userDefaults.motionBlurOpacity) ? userDefaults.motionBlurOpacity : newDefaults.motionBlurOpacity;
                newDefaults.wheelSensitivity = isDefined(userDefaults.wheelSensitivity) ? userDefaults.wheelSensitivity : newDefaults.wheelSensitivity;
                newDefaults.pixelRatio = isDefined(userDefaults.pixelRatio) ? userDefaults.pixelRatio : newDefaults.pixelRatio;

                if (isDefined(userDefaults.pan)) {
                    angular.extend(newDefaults.pan, userDefaults.pan);
                }

            }

            newDefaults.style = isDefined(userStyle) ? userStyle : {};

            var graphId = obtainEffectiveGraphId(defaults, scopeId);
            defaults[graphId] = newDefaults;
            return newDefaults;
        }

    }
})();
(function(){
    'use strict';

    angular
        .module('ngCytoscape')
        .service('cytoHelpers', cytoHelpers);
    cytoHelpers.$inject=['$q'];
    function cytoHelpers($q){
        var _errorHeader = '[AngularJS - Cytoscape] ';
        var _copy = angular.copy;
        var _clone = _copy;

        function _obtainEffectiveGraphId(d, graphId) {
            var id;
            var i;
            if (!angular.isDefined(graphId)) {
                if (Object.keys(d).length === 0) {
                    id = 'ngCyMain';
                } else if (Object.keys(d).length >= 1) {
                    for (i in d) {
                        if (d.hasOwnProperty(i)) {
                            id = i;
                        }
                    }
                } else {
                    $log.error(_errorHeader + '- You have more than 1 graph on the DOM, you must provide the graph ID to the cytoData.geGraph call');
                }
            } else {
                id = graphId;
            }

            return id;
        }

        function _getUnresolvedDefer(d, graphId) {
            var id = _obtainEffectiveGraphId(d, graphId);
            var defer;

            if (!angular.isDefined(d[id]) || d[id].resolvedDefer === true) {
                defer = $q.defer();
                d[id] = {
                    defer: defer,
                    resolvedDefer: false
                };
            } else {
                defer = d[id].defer;
            }

            return defer;
        }

        var _isDefined = function(value) {
            return angular.isDefined(value) && value !== null;
        };

        var _isUndefined = function(value) {
            return !_isDefined(value);
        };

        return {
            copy:_copy,
            clone:_clone,
            defaultTo: function(val, _default) {
                return _isDefined(val) ? val : _default;
            },

            //mainly for checking attributes of directives lets keep this minimal (on what we accept)
            isTruthy: function(val) {
                return val === 'true' || val === true;
            },

            //Determine if a reference is {}
            isEmpty: function(value) {
                return Object.keys(value).length === 0;
            },

            //Determine if a reference is undefined or {}
            isUndefinedOrEmpty: function(value) {
                return (angular.isUndefined(value) || value === null) || Object.keys(value).length === 0;
            },

            // Determine if a reference is defined
            isDefined: _isDefined,
            isUndefined:_isUndefined,
            isNumber: angular.isNumber,
            isString: angular.isString,
            isArray: angular.isArray,
            isObject: angular.isObject,
            isFunction: angular.isFunction,
            equals: angular.equals,

            safeApply: function (scope, fn) {
                var phase = scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest')
                    scope.$eval(fn);
                else
                    scope.$apply(fn);
            },
            asyncEach: function(array, fn, maxTimePerChunk, context){
                var deferred = $q.defer();
                var length = array.length;
                context = context || window;
                maxTimePerChunk = maxTimePerChunk || 200;
                var index = 0;

                function now() {
                    return new Date().getTime();
                }

                function doChunk() {
                    var startTime = now();

                    while (index < length && (now() - startTime) <= maxTimePerChunk) {
                        // callback called with args (value, index, array)
                        fn.call(context, array[index], index, array);
                        ++index;
                    }
                    if (index < length) {
                        // set Timeout for async iteration
                        setTimeout(doChunk, 1);
                    }else if(index === length){
                        deferred.resolve();
                    }
                }
                doChunk();
                return deferred.promise;
            },

            obtainEffectiveGraphId: _obtainEffectiveGraphId,

            getDefer: function(d, graphId) {
                var id = _obtainEffectiveGraphId(d, graphId);
                var defer;
                if (!angular.isDefined(d[id]) || d[id].resolvedDefer === false) {
                    defer = _getUnresolvedDefer(d, graphId);
                } else {
                    defer = d[id].defer;
                }

                return defer;
            },

            getUnresolvedDefer: _getUnresolvedDefer,

            setResolvedDefer: function(d, graphId) {
                var id = _obtainEffectiveGraphId(d, graphId);
                d[id].resolvedDefer = true;
            }

        };
    }
})();
(function(){
    'use strict';
    angular
        .module('ngCytoscape')
        .factory('cytoLayoutDefaults', cytoLayoutDefaults);
    function _getDefaults(){
        return{
            random:{
                name: 'random',
                fit: true, // whether to fit to viewport
                padding: 30, // fit padding
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            preset:{
                name: 'preset',
                positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
                zoom: undefined, // the zoom level to set (prob want fit = false if set)
                pan: undefined, // the pan level to set (prob want fit = false if set)
                fit: true, // whether to fit to viewport
                padding: 30, // padding on fit
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            grid:{
                name: 'grid',
                fit: true, // whether to fit the viewport to the graph
                padding: 30, // padding used on fit
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
                avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
                condense: false, // uses all available space on false, uses minimal space on true
                rows: undefined, // force num of rows in the grid
                cols: undefined, // force num of columns in the grid
                position: function( node ){}, // returns { row, col } for element
                sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            circle:{
                name: 'circle',
                fit: true, // whether to fit the viewport to the graph
                padding: 30, // the padding on fit
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
                radius: undefined, // the radius of the circle
                startAngle: 3/2 * Math.PI, // where nodes start in radians
                sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
                clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
                sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            concentric:{
                name: 'concentric',
                fit: true, // whether to fit the viewport to the graph
                padding: 30, // the padding on fit
                startAngle: 3/2 * Math.PI, // where nodes start in radians
                sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
                clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
                equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
                minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
                height: undefined, // height of layout area (overrides container height)
                width: undefined, // width of layout area (overrides container width)
                concentric: function(node){ // returns numeric value for each node, placing higher nodes in levels towards the centre
                    return node.degree();
                },
                levelWidth: function(nodes){ // the variation of concentric values in each level
                    return nodes.maxDegree() / 4;
                },
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            breadthfirst:{
                name: 'breadthfirst',
                fit: true, // whether to fit the viewport to the graph
                directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
                padding: 30, // padding on fit
                circle: false, // put depths in concentric circles if true, put depths top down if false
                spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
                roots: undefined, // the roots of the trees
                maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                ready: undefined, // callback on layoutready
                stop: undefined // callback on layoutstop
            },
            cose:{
                name: 'cose',

                // Called on `layoutready`
                ready               : function() {},

                // Called on `layoutstop`
                stop                : function() {},

                // Whether to animate while running the layout
                animate             : false,

                // The layout animates only after this many milliseconds
                // (prevents flashing on fast runs)
                animationThreshold  : 250,

                // Number of iterations between consecutive screen positions update
                // (0 -> only updated on the end)
                refresh             : 20,

                // Whether to fit the network view after when done
                fit                 : true,

                // Padding on fit
                padding             : 30,

                // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                boundingBox         : undefined,

                // Extra spacing between components in non-compound graphs
                componentSpacing    : 100,

                // Node repulsion (non overlapping) multiplier
                nodeRepulsion       : function( node ){ return 400000; },

                // Node repulsion (overlapping) multiplier
                nodeOverlap         : 10,

                // Ideal edge (non nested) length
                idealEdgeLength     : function( edge ){ return 10; },

                // Divisor to compute edge forces
                edgeElasticity      : function( edge ){ return 100; },

                // Nesting factor (multiplier) to compute ideal edge length for nested edges
                nestingFactor       : 5,

                // Gravity force (constant)
                gravity             : 80,

                // Maximum number of iterations to perform
                numIter             : 1000,

                // Initial temperature (maximum node displacement)
                initialTemp         : 200,

                // Cooling factor (how the temperature is reduced between consecutive iterations
                coolingFactor       : 0.95,

                // Lower temperature threshold (below this point the layout will end)
                minTemp             : 1.0,

                // Whether to use threading to speed up the layout
                useMultitasking     : true
            }
        };
    }
    function cytoLayoutDefaults(){
        var factory = {
            getDefaultLayouts:getDefaultLayouts
        };
        return factory;

        function getDefaultLayouts(){
            return _getDefaults();
        }
    }

})();