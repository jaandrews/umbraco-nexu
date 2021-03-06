﻿angular.module('umbraco').controller('Our.Umbraco.Nexu.BaseDeleteController',
    ['$scope', '$controller', 'Our.Umbraco.Nexu.Resource',
        function ($scope, $controller, nexuResource) {
            // inherit core delete controller
            if ($scope.isMedia) {
                angular.extend(this, $controller('Umbraco.Editors.Media.DeleteController', { $scope: $scope }));
            } else {
                angular.extend(this, $controller('Umbraco.Editors.Content.DeleteController', { $scope: $scope }));
            }
           

            $scope.links = {};
            $scope.descendantsHaveLinks = false;
            $scope.isLoading = true;

            nexuResource.getIncomingLinks($scope.currentNode.id).then(function (result) {
                $scope.links = result.data;

                if (result.data.length == 0) {
                    nexuResource.checkDescendants($scope.currentNode.id, $scope.isMedia).then(function (result) {
                        $scope.descendantsHaveLinks = result.data;
                        $scope.isLoading = false;
                    });
                } else {
                    $scope.isLoading = false;
                }

            });
        }]);