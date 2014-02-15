var twilio = require('twilio');
exports.response = function(req,res) {
  var resp = new twilio.TwimlResponse();

  resp.say({voice:'alice'}, 'ahoy hoy! Testing Twilio and node.js');

  res.set(
    );
  res.send(resp.toString());
  console.log(req);

};
