(function(){
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/gettingStarted");
            //
            // Now set up the states
            $stateProvider
                .state('defaults', {
                    url: "/defaults",
                    templateUrl: "dst/templates/defaults.html",
                    controller: 'defaultsCtrl'
                })
                .state('gettingStarted', {
                    url: "/gettingStarted",
                    templateUrl: "dst/templates/gettingStarted.html",
                    controller: 'gettingStartedCtrl'
                })
                .state('elements', {
                    url: "/elements",
                    templateUrl: "dst/templates/elements.html",
                    controller: 'elementsCtrl'
                })
                .state('layouts', {
                    url: "/layouts",
                    templateUrl: "dst/templates/layouts.html",
                    controller: 'layoutsCtrl'
                })
                .state('styles', {
                    url: "/styles",
                    templateUrl: "dst/templates/styles.html",
                    controller: 'stylesCtrl'
                })
                .state('events', {
                    url: "/events",
                    templateUrl: "dst/templates/events.html",
                    controller: 'eventsCtrl'
                })
                .state('core', {
                    url: "/core",
                    templateUrl: "dst/templates/core.html",
                    controller: 'coreCtrl'
                })
        });
})();