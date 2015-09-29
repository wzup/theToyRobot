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
        wrongPlace: 'Warning! You cannot place the robot in that square, it can fall.',
        wrondDirection: 'Error! No such a direction. Available directions are: {availableDirections}',
        robotPosition: 'Robot\'s position is: {0}, {1}, {2}',
        noNegativeCoordinates: 'Error! No negative X or Y allowed. Try again.',
        wrongMove: 'Warning! You cannot move the robot that way, it can fall.',
        welcome: 'Welcome to The Toy Robot game. Start with placing a robot typing PLACE X, Y, F.',
        someMsg: 'Some {new} message',
        combinedMsg: 'And this is a {0} {1} {messageCombined}'
    },
    oSubs: {
        availableDirections: config.robot.aDirections.join(', '),
        availableCommands: config.robot.aCommands.join(', '),
        'new': 'COOL AND GREAT',
        messageCombined: 'New Combined Msg'
    }
};
