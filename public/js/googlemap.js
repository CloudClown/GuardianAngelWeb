var googleMapApp = angular.module('googleMapApp', ['google-maps', 'firebase', 'geolocation']);

function Marker(lat,lon,title,img) {
  this.latitude = lat;
  this.longitude = lon;
  this.title = title;
  this.icon = img;
}

var us;
googleMapApp.controller('googleMapCTRL', function($scope, $firebase, geolocation) {
  var users = new Firebase("https://guardianangel.firebaseio.com/users");

  $scope.users = $firebase(users);
  geolocation.getLocation().then(function(data) {
    var lat,lon;
    if (data.coords.latitude === null) {
      lat = 43;
      lon = -73;
    }
    else {
      lat = data.coords.latitude;
      lon = data.coords.longitude;
    }
    $scope.map.center.latitude = lat;
    $scope.map.center.longitude = lon;
    $scope.$apply();
  });
 angular.extend($scope, {
      map: {
        dragging: true,
      center: {
        latitude: 43,
        longitude: -73
      },
      zoom: 13,
      markers: []
      }
    });

$scope.users.$on("change", function() {
    var img;
    var keys = $scope.users.$getIndex();
    keys.forEach(function(key, i) {
      var lat = $scope.users[key].latitude;
      var lon = $scope.users[key].longitude;
      if ($scope.users[key].dangerLevel == 5) {
          img = "/img/danger.png";
      }
      else {
          img = "/img/safe.png";
      }
      $scope.map.markers[i] = new Marker(lat,lon,lat + " , " + lon, img);
    console.log(img);
    });
});
});
