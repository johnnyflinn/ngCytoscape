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
        });
})();