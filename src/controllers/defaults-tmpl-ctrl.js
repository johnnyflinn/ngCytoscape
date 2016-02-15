(function(){
    'use strict';

    angular
        .module('app')
        .controller('defaultsCtrl', defaultsCtrl);
    defaultsCtrl.$inject = ['$scope', 'cytoData'];
    function defaultsCtrl($scope, cytoData){
       /* $scope.switch = function(text){
            if(text === 'HTML'){
                $scope.codeView.html = true;
                $scope.codeView.javascript = false;
            }else{
                $scope.codeView.html = false;
                $scope.codeView.javascript = true;
            }
        };
        $scope.codeView = {
            html:true,
            javascript:false
        };*/
        $scope.layout = {name:'grid'};
        $scope.defaults = {
            zoomingEnabled: false,
            userPanningEnabled: false
        };

        $scope.elements = {
            n1:{
                data:{}
            },
            n2:{
                data:{}
            },
        };
    }
})();