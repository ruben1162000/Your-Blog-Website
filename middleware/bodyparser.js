const bodyParser = require('body-parser');
module.exports.urlencodedParser = bodyParser.urlencoded({ extended: true });
module.exports.jsonParser = bodyParser.json();