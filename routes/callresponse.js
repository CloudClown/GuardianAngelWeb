var twilio = require('twilio');
exports.response = function(req,res) {
  var resp = new twilio.TwimlResponse();
  var name = req.params.name;
  resp.say({voice:'alice'}, 'Emergency!, '+name+' is in danger.  Please contact help.');

  res.set('content-type', 'text/xml');
  res.send(resp.toString());
};
