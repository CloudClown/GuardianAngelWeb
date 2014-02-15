var googleMapApp = angular.module('googleMapApp', ['google-maps', 'firebase']);

function Marker(lat,lon,title) {
  this.latitude = lat;
  this.longitude = lon;
  this.title = title;
}
var us;
googleMapApp.controller('googleMapCTRL', function($scope, $firebase) {
  var users = new Firebase("https://guardianangel.firebaseio.com/users");

  $scope.users = $firebase(users);

  angular.extend($scope, {
    map: {
      dragging: true,
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 6,
      markers: []
    }
  });
$scope.users.$on("change", function() {
    var keys = $scope.users.$getIndex();
    keys.forEach(function(key, i) {
      var lat = $scope.users[key].latitude;
      var lon = $scope.users[key].longitude;
      console.log(i);
      $scope.map.markers[i] = new Marker(lat,lon,lat + " , " + lon);
      console.log($scope.map.markers);
    });
});
});
