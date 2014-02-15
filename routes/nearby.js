var Firebase = require('firebase');


exports.danger = function(req, res) {
  var userList = new Firebase("https://guardianangel.firebaseio.com/users");
  var id = req.params.id;
  var minLevel = req.params.level;
  var key;
  var inDangerUsers = [];

  userList.on('value', function(snapshot) {
    var users = snapshot.val();
    var user = snapshot.val()[id];
    for(key in users) {
      if (users.hasOwnProperty(key)) {
        if(key === id) {
          continue;
        }
        if(users[key].latitude - user.latitude < 1 &&
          users[key].longitude - user.longitude < 1) {
            if(users[key].dangerLevel >= minLevel) {
              inDangerUsers.push(users[key]);
            }
          }
    }
  }
  res.set('Content-Type', 'application/json');
  res.send(inDangerUsers);
  });
  
};
