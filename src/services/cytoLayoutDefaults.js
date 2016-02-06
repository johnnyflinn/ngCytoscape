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