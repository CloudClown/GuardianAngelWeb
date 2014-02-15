var sendgrid  = require('sendgrid')('Zephoku', 'Midomi6592');

var Firebase = require('firebase');

function informEmail(name, email) {
  sendgrid.send({
    to:       email,
    from:     'roberttnb@gmail.com',
    subject:  'WARNING: '+name+' is in danger!',
    text:     name + ' has been found to be in danger through the surveillence of Guardian Angel.  Her current location can be found online.'
  }, function(err, json) {
    if (err) { return console.error(err); }
  });
}

var twilio = require('twilio')('AC04a0ee31cd6f7f96f6dca0b69f153a39', '81195b81193335d30ec064523e18f4e7');

function informText(name, phone) {
  return twilio.sendMessage({

    to: phone,
    from: '+1 760-983-2393',
    body: 'An emergency has occurred.  '+name+' is in danger! '

  });
}

function informPhone(name, phone) {
  twilio.makeCall({

    to: phone, 
    from: '+1 760-983-2393', 
    url: 'http://guardianangel.herokuapp.com/callresponse'
  });
}


exports.all = function(req,res) {
  var id = req.params.id;
  var contactList = new Firebase("https://guardianangel.firebaseio.com/contacts");
  contactList.on('value', function(snapshot) {
    var contact = snapshot.val()[id];
    informEmail(contact.name, contact.email);
    informText(contact.name, contact.phone);
    informPhone(contact.name, contact.phone);
    res.send(JSON.stringify("Success"));
  });
};
