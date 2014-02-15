var sendgrid  = require('sendgrid')('Zephoku', 'Midomi6592');
function informOfDanger(name, email) {
  sendgrid.send({
    to:       email,
    from:     'roberttnb@gmail.com',
    subject:  'WARNING: '+name+' is in danger!',
    text:     name + ' has been found to be in danger through the surveillence of Guardian Angel.  Her current location can be found online.'
  }, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
}

exports.email = function(req,res) {
  res.send(informOfDanger("Jackie Jin", "superrobot92@gmail.com"));
  
};
