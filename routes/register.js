/*
 * GET Home Page.
 */
var Firebase = require('firebase');

exports.emergency = function(req, res) {
  res.render('register', {title: 'Guardian Angel'});
};

exports.setContacts = function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;
  
  var contactList = new Firebase("https://guardianangel.firebaseio.com/contacts/"+id);
  contactList.update({
    name: name, 
    phone: phone,
    email: email
  });
  res.render('register',{title: 'Guardian Angel'});
};
