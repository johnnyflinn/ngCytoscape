
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

            newDefaults.layout = isDefined(userLayout) ? userLayout : {name:'grid'};


            var graphId = obtainEffectiveGraphId(defaults, scopeId);
            defaults[graphId] = newDefaults;
            return newDefaults;
        }

    }
})();