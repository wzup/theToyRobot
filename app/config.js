'use strict';

var config = {};

module.exports = config;

config.playground = {
    startPointX: 0,
    startPointY: 0,
    lengthX: 5,
    lengthY: 5
};
config.robot = {
    aCommands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    initialCommands: ['PLACE'],
    aDirections: ['NORTH', 'EAST', 'SOUTH', 'WEST']
};
config.messenger = {
    oMsgs: {
        noInitialCommand: 'Warning! You didn\'t placed a robot first. Type "PLACE X, Y, F" to position a robot on the playground.',
        placeRobotFirst: 'Warning! The robot is not yet on the playground. PLACE it first to begin.',
        wrongPlace: 'Warning! You cannot place the robot in that square, it can fall. The square is out of the playground.',
        wrondDirection: 'Error! No such a direction. Available directions are: {availableDirections}',
        noFace: 'Error! No FACE was provided. Correct form is: PLACE X, Y, FACE.',
        unknownCommand: 'Error! Command is unknown. Available commands are: {availableCommands}',
        robotPosition: 'Robot\'s position is: {x}, {y}, {f}',
        noNegativeCoordinates: 'Error! No negative X or Y allowed. Try again.',
        nonIntCoordinates: 'Warning! X and Y must be integers.',
        wrongMove: 'Warning! You cannot move the robot that way, it can fall.',
        welcome: 'Welcome to The Toy Robot game. Start with placing a robot typing PLACE X, Y, F.',
        someCombinedMsg: 'For the {s} of testing: PLACE {x}, {y}, {z} in {country}'

    },
    oSubs: {
        availableDirections: config.robot.aDirections.join(', '),
        availableCommands: [config.robot.aCommands.reduce(function(prev, cur) {
            if (prev == 'PLACE')
                prev = [prev, 'X, Y, F'].join(' ');
            return prev + ' | ' + cur;
        }), '.'].join(''),
        country: 'Australia'
    }
};
