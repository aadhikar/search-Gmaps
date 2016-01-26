var searchApp = angular.module('placeSearch', []);
searchApp.config(function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
searchApp.controller('placeSearchController', function ($scope, $http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  var googleKey = 'AIzaSyBfkf5Vv-RT7SkxEoEGDSS1J5ScjAANvcQ';
  $scope.getPlaces = function (searchParam) {
    $scope.hideSave = false;
    params = 'query=' + searchParam + '&' + 'key=' + googleKey;
    var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' + params;
    $http.get(url).then(function (result) {
      $scope.searchResults = result.data.results;
    });
  };
  $scope.savePlace = function (name, rating) {
    var thisPlace = {
      name: name,
      rating: rating
    }

    var myPlaces = JSON.parse(localStorage.getItem('mySavedPlaces')) || [];
    myPlaces.push(thisPlace);
    localStorage.setItem('mySavedPlaces', JSON.stringify(myPlaces));
  };
  $scope.ShowSaved = function () {
    $scope.searchResults = JSON.parse(localStorage.getItem('mySavedPlaces')) || [];
    $scope.hideSave = true;
  };
});
