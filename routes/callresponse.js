var twilio = require('twilio');
exports.response = function(req,res) {
  var resp = new twilio.TwimlResponse();

  resp.say({voice:'alice'}, 'ahoy hoy! Testing Twilio and node.js');

  res.set('content-type', 'text/xml'
    );
  res.send(resp.toString());
  console.log(req);

};
