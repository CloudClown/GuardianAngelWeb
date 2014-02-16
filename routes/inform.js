var sendgrid  = require('sendgrid')('HackieJ', 'sendgrid8888');

var Firebase = require('firebase');

function informEmail(name, email, loc, text) {
  sendgrid.send({
    to:       email,
    from:     'roberttnb@gmail.com',
    subject:  'WARNING: '+name+' is in danger!',
    text:     name + ' has been found to be in danger through the surveillence of Guardian Angel.  Their current location is ' + loc + '.  The last things they said was"' +text+'".  You can see an up to date version of their location online.  http://guardianangel.herokuapp.com/'
  }, function(err, json) {
    if (err) { return console.error(err); }
  });
}

var twilio = require('twilio')('AC04a0ee31cd6f7f96f6dca0b69f153a39', '81195b81193335d30ec064523e18f4e7');

function informText(name, phone, loc, text) {
  return twilio.sendMessage({

    to: phone,
    from: '+1 760-983-2393',
    body: 'An emergency has occurred.  '+name+' is in danger! They were last found at '+ loc + '.  They last said: "'+text+'".',
    id:'test'

  });
}

function informPhone(name, phone, loc, text) {
  twilio.makeCall({
    to: '+1' + phone, 
    from: '+1 760-983-2393', 
    url: 'http://guardianangel.herokuapp.com/callresponse/'+name+'/'+text+'/'+loc
  });
}


exports.all = function(req,res) {
  var id = req.params.id;
  var contactList = new Firebase("https://guardianangel.firebaseio.com/contacts");
  var userList = new Firebase("https://guardianangel.firebaseio.com/users");
  contactList.once('value', function(snapshot) {
    var contact = snapshot.val()[id];
    userList.once('value', function(usershot) {
      var user = usershot.val()[id];
      if (contact !== null) {
        informEmail(contact.name, contact.email, contact.location, user.text);
        informText(contact.name, contact.phone, contact.location, user.text);
        informPhone(contact.name, contact.phone, contact.location, user.text);
      }

    });
        res.send(JSON.stringify("Success"));
  });
};
