'use strict';

const util = require('util');
const EventEmitter = require('events');

function Robot(config, playground, messanger) {

    EventEmitter.call(this);

    this._config = config || {},
        this._playground = playgroud || {},
        this._messenger = messenger || {},
        this._isFirstStepMade = false,
        // We store FACE as an int,
        // not as a string (such as 'north', 'east', etc.)
        // int references index in a config.aDirections array
        // ['NORTH', 'EAST', 'SOUTH', 'WEST']
        this._oCurrentPosition = {
            x: undefined,
            y: undefined,
            f: undefined
        };
};

util.inherits(Robot, EventEmitter);


Robot.prototype.place = function(x,y,f) {
    this.emit('place');
};

var robot = new Robot();
robot.on('place', function (x,y,f) {

});
