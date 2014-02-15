var twilio = require('twilio');
exports.response = function(req,res) {
  var resp = new twilio.TwimlResponse();
  resp.say({voice:'alice'}, 'Emergency!, someone you know is in danger.  Please contact help.');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};
