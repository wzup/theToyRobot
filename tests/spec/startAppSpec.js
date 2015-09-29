'use strict';

var Robot = require('./../../app/robot');
var Playground = require('./../../app/playground');
var aCommands = ['place', 'move', 'left', 'right', 'report'];
var aDirections = ['north', 'east', 'south', 'west'];
// debugger
// return 0;


describe('The Toy Robot', function() {
    var robot;
    var playground;
    var x, y, f;
    var aDirections;

    beforeAll(function() {
        robot = new Robot();
        playground = new Playground();
        // spyOn(console, 'log');
    });

    it('should not accept MOVE command before initial PLACE command was made', function() {
        expect(robot.move()).toEqual('Warning! You didn\'t placed a robot first. Type "PLACE X, Y, F" to position a robot on the playground.');
    });

    it('should not accept negative Y in PLACE', function() {
        x = 0, y = -1, f = 'south';
        expect(robot.place(x, y, f)).toEqual('Error! No negative X or Y allowed. Try again.');
    });

    it('should not accept negative X in PLACE', function() {
        x = -1, y = 0, f = 'south';
        expect(robot.place(x, y, f)).toEqual('Error! No negative X or Y allowed. Try again.');
    });

    it('should not accept invalid FACING words', function() {
        x = 2, y = 3, f = 'foo';
        expect(robot.place(x, y, f)).toEqual('Error! No such a direction. Available directions are: NORTH, EAST, SOUTH, WEST.');
    });

    it('should not be placed outside the playground', function() {
        x = 0, y = 6, f = 'north';
        expect(robot.place(x, y, f)).toEqual('Warning! You cannot place the robot in that square, it can fall.');
    });

    it('should not make a move to outside the playground', function() {
        x = 5, y = 2, f = 'east',
        aDirections = ['north', 'east'];
        var startPointX = 0;
        var startPointY = 0;
        var lengthX = 5;
        var lengthY = 5;

        for (var i = 0; i < aDirections.length; i++) {
            var direction = aDirections[i];
            for (var m = 0; m < 5; i++) {
                if(direction == 'north') {
                    robot.place(m, 4, direction);
                    expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
                }
                else if (direction == 'east') {
                    robot.place(4, m, direction);
                    expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
                };
            }
        };

        expect(robot.place(x, y, f)).toBe(true);
        expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
    });

    // it('should prevent robot from falling walking NORTH', function() {
    //     robot.place(0, 5, 'north');
    //     expect.match(robot.move());
    // });

    // it('should be square 5x5 playground', function() {

    // });
});
