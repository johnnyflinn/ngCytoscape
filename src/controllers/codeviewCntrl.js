(function(){
    'use strict';

    angular
        .module('app')
        .controller('codeView', codeView);
    codeView.$inject = ['$scope'];
    function codeView($scope){
        var vm = this;
        vm.switch = function(text){
         if(text === 'HTML'){
            vm.codeView.html = true;
            vm.codeView.javascript = false;
         }else{
            vm.codeView.html = false;
            vm.codeView.javascript = true;
         }
         };
         vm.codeView = {
         html:true,
         javascript:false
         };

    }
})();