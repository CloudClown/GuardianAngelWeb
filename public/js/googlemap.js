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
    if (data.coords.latitude == null) {
      $scope.coords.lat =  43;
      $scope.coords.lon = -73;
      return;
    }
    $scope.center = {lat:data.coords.latitude, lon:data.coords.longitude};
  });

  angular.extend($scope, {
    map: {
      dragging: true,
      center: {
        latitude: $scope.coords.lat,
        longitude: $scope.coords.lon
      },
      zoom: 6,
      markers: []
    }
  });
console.log($scope.map);
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
