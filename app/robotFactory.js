/**
 * The Toy Robot Factory
 * It constructs a robot, passing dependencie
 * ДОПИСАТЬ
 */


var Playground = require('./playground');
var Messenger = require('./messenger');
var config = require('./config');
var Robot = require('./robot');

module.exports = new Robot(config.robot,
    new Playground(config.playground),
    new Messenger(config.messenger));
