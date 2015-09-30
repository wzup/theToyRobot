'use strict';


var Playground = require('./../../app/playground');
var Messenger = require('./../../app/messenger');
var config = require('./../../app/config');
var Robot = require('./../../app/robot');

describe('The Toy Robot', function() {
    var robot;
    var playground;
    var messenger;
    var x, y, f;
    var aDirections;

    beforeAll(function() {
        messenger = new Messenger(config.messenger);
    });

    beforeEach(function() {
        robot = new Robot(config.robot,
            new Playground(config.playground),
            messenger);
    });

    it('coordinates should be undefined at start', function() {
        var oPosition = robot._getRobotPosition();
        expect(oPosition.x == undefined &&
            oPosition.y == undefined &&
            oPosition.f == undefined).toBe(true);
    });

    it('should say "place me first to begin" at start', function() {
        expect(robot.report()).toEqual(messenger.getMessage({msg: 'placeRobotFirst'}));
    });

    it('should not accept nonInt X or Y', function() {
        var x = "foo", y = "1,4", f = "south";
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({msg: 'nonIntCoordinates'}));
    });

    it('should not accept undefined FACE', function() {
        var x = "foo", y = "1,4", f;
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({msg: 'noFace'}));
    });

    it('should not accept negative Y in PLACE', function() {
        x = 0, y = -1, f = 'south';
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({
            msg: 'noNegativeCoordinates'
        }));
    });

    it('should not accept negative X in PLACE', function() {
        x = -1, y = 0, f = 'south';
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({
            msg: 'noNegativeCoordinates'
        }));
    });

    it('should not accept invalid FACING words', function() {
        x = 2, y = 3, f = 'foo';
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({
            msg: 'wrondDirection'
        }));
    });

    it('should not be placed outside the playground', function() {
        x = 0, y = 6, f = 'north';
        expect(robot.place(x, y, f)).toEqual(messenger.getMessage({
            msg: 'wrongPlace'
        }));
    });

    it('should have "_isFirstStepMade = false" before initial PLACE', function() {
        expect(robot._getIsFirstStepMade()).toBe(false);
    });

    it('should set "_isFirstStepMade = true" upon successful initial PLACE', function() {
        var placeToX = 3,
            placeToY = 3,
            f = 'south';
        robot.place(placeToX, placeToY, f);
        expect(robot._getIsFirstStepMade()).toBe(true);
    });

    it('should change X, Y upon successful place', function() {
        var placeToX = 3,
            placeToY = 3,
            f = 'south',
            oPositionEnd = {};
        robot.place(placeToX, placeToY, f);
        oPositionEnd = robot._getRobotPosition();
        expect(oPositionEnd.x == placeToX &&
            oPositionEnd.y == placeToY &&
            oPositionEnd.f == f.toUpperCase()).toBe(true);
    });

    it('should return TRUE if PLACE was successful', function() {
        x = 1, y = 1, f = 'south';
        expect(robot.place(x, y, f)).toBe(true);
    });

    it('should not accept MOVE command before initial PLACE command was made', function() {
        expect(robot.move()).toEqual(messenger.getMessage({
            msg: 'noInitialCommand'
        }));
    });

    it('should not be able to step out of the playground', function() {
        var x = 4,
            y = 0,
            f = 'east';
        robot.place(x, y, f);
        expect(robot.move()).toEqual(messenger.getMessage({
            msg: 'wrongMove'
        }));
    });

    it('should successfully make a correct MOVE', function() {
        var x = 1,
            y = 1,
            f = 'east';
        robot.place(x, y, f);
        expect(robot.move()).toBe(true);
        // console.log('== robot._getRobotPosition() ==: ', robot._getRobotPosition());
    });

    it('should turn LEFT (change face)', function() {
        var x = 1,
            y = 1,
            f = 'north';
        robot.place(x, y, f);
        robot.left()
        expect(robot._getRobotPosition().f).toEqual('WEST');
        // console.log('== robot._getRobotPosition() LEFT ==: ', robot._getRobotPosition());
    });

    it('should turn RIGHT (change face)', function() {
        var x = 1,
            y = 1,
            f = 'north';
        robot.place(x, y, f);
        robot.right();
        expect(robot._getRobotPosition().f).toEqual('EAST');
        // console.log('== robot._getRobotPosition() RIGHT ==: ', robot._getRobotPosition());
    });

    it('should not accept invalid command', function() {
        var x = 1,
            y = 1,
            f = 'north';
        robot.place(x, y, f);
        robot.right();
        expect(robot._getRobotPosition().f).toEqual('EAST');
        // console.log('== robot._getRobotPosition() RIGHT ==: ', robot._getRobotPosition());
    });


    // it('should not make a move to outside the playground', function() {
    //     x = 5, y = 2, f = 'east',
    //         aDirections = ['north', 'east'];
    //     var startPointX = 0;
    //     var startPointY = 0;
    //     var lengthX = 5;
    //     var lengthY = 5;

    //     for (var i = 0; i < aDirections.length; i++) {
    //         var direction = aDirections[i];
    //         for (var m = 0; m < 5; i++) {
    //             if (direction == 'north') {
    //                 robot.place(m, 4, direction);
    //                 expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
    //             } else if (direction == 'east') {
    //                 robot.place(4, m, direction);
    //                 expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
    //             };
    //         }
    //     };

    //     expect(robot.place(x, y, f)).toBe(true);
    //     expect(robot.move()).toEqual('Warning! You cannot move the robot that way, it can fall.');
    // });

    // it('should prevent robot from falling walking NORTH', function() {
    //     robot.place(0, 5, 'north');
    //     expect.match(robot.move());
    // });

    // it('should be square 5x5 playground', function() {
    // });
});
