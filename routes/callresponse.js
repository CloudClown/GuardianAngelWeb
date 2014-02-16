var twilio = require('twilio');
exports.response = function(req,res) {
  var name = req.params.name;
  var text = req.params.text;
  var loc = req.params.loc;
  var resp = new twilio.TwimlResponse();
  resp.say({voice:'alice'}, 'Emergency!, '+name+' is in danger.  Please contact help.  They were last seen at ' + loc +'.  They last said "'+text+'" ');

  res.set('Content-Type','text/xml');
  res.end(resp.toString());
};
