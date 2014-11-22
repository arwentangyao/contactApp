'use strict';

/* Directives */


var contactDirectives = angular.module('contactDirectives', []);
contactDirectives.directive('submitButton', function() {
    //this directive is used to prevent multiple clicks when validation is false
    return {
        restrict: 'A',
        scope: {
            enableButton: "="
        },
        link: function ($scope, ele) {
            var defaultSaveText = ele.html();

            ele.bind('click', function(){
                ele.attr('disabled',true);
            });

            $scope.$watch('enableButton', function() {
                ele.removeAttr('disabled');
                ele.html(defaultSaveText);
            });
        }
    };
});