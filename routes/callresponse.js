var twilio = require('twilio');
exports.response = function(req,res) {
  console.log(req.params.name);
  var name = req.params.name;
  var resp = new twilio.TwimlResponse();
  resp.say({voice:'alice'}, 'Emergency!, '+name+' is in danger.  Please contact help.');

  res.set('Content-Type','text/xml');
  res.end(resp.toString());
};
