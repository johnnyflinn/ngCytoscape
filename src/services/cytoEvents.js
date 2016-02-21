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
                /* jshint ignore:start */
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
                /* jshint ignore:end */
            }
        }

    }
})();