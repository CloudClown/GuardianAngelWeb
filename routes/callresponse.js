var twilio = require('twilio');
exports.response = function(req,res) {
  var resp = new twilio.TwimlResponse();
  resp.say({voice:'alice'}, 'Emergency!, someone you know is in danger.  Please contact help.');

  res.set('content-type', 'text/xml');
  res.send(resp.toString());
};
