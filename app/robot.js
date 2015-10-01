'use strict';

var config = require('./config');
module.exports = Robot;


/**
 * [Robot description]
 * @param {[type]} config    [description]
 * @param {[type]} playgroud [description]
 * @param {[type]} messenger [description]
 * @constructor
 */
function Robot(config, playgroud, messenger) {

    this._config = config,
        this._playground = playgroud,
        this._messenger = messenger,
        this._isFirstStepMade = false,
        // We store FACE as an int, not as a string (such as 'north', 'east',
        // etc.) int references index in a config.aDirections array ['NORTH',
        // 'EAST', 'SOUTH', 'WEST']
        this._oCurrentPosition = {
            x: undefined,
            y: undefined,
            f: undefined
        };
}

var prototype = {
    place: function(x, y, f) {

        var arg = {};

        // Validate user input
        try {
            arg = this._validateInput(x, y, f);
        } catch (e) {
            return e;
        }

        // PLACE a robot only inside of playground
        if (this._isOutOfPlayground(arg.x, arg.y)) {
            return new Error(this._messenger.getMessage({
                msg: 'wrongPlace'
            }));
        }

        // Places a robot, updates its X,Y,F
        this._setRobotPosition(arg.x, arg.y, arg.f);

        // Fix that initial PLACE has been made
        if (!this._isFirstStepMade)
            this._isFirstStepMade = true;

        return this;
    },
    move: function() {
        var x, y, f;

        // Check if initial PLACE command was made
        if (!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitialCommand'
            }));;
        }

        x = this._oCurrentPosition.x;
        y = this._oCurrentPosition.y;
        f = this._oCurrentPosition.f;

        // Change X or Y correctly to
        switch (f) {
            case 0: // north
                ++y;
                break;
            case 1: // east
                ++x;
                break;
            case 2: // south
                --y
                break;
            case 3: // west
                --x;
                break;
        }

        // Check if the step in not outside the playground
        if (this._isOutOfPlayground(x, y)) {
            return new Error(this._messenger.getMessage({
                msg: 'wrongMove'
            }));
        }

        this._setRobotPosition(x, y, this._config.aDirections[f]);

        return this;
    },
    right: function() {
        if (!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitialCommand'
            }));
        }
        this._oCurrentPosition.f =
            (this._oCurrentPosition.f + 1) > 3 ?
            0 : this._oCurrentPosition.f + 1;
    },
    left: function() {
        if (!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitialCommand'
            }));
        }
        this._oCurrentPosition.f =
            (this._oCurrentPosition.f - 1) < 0 ?
            3 : this._oCurrentPosition.f - 1;
    },
    report: function(msgObj) {
        // Call .report() without any parameters.
        if (!msgObj) {
            var oPosition = this._getRobotPosition();

            // Very beginning, no any PLACE yet, coords are undefined
            // return a message "PLACE a robot to begin", not coords
            if (oPosition.x == undefined &&
                oPosition.y == undefined &&
                oPosition.f == undefined) {
                return this._messenger.getMessage({
                    msg: 'placeRobotFirst'
                });
                // coords are defined, return robot's position msg
            } else {
                return this._messenger.getMessage({
                    msg: 'robotPosition',
                    x: oPosition.x,
                    y: oPosition.y,
                    f: oPosition.f
                });
            }
        } else
            return this._messenger.getMessage(msgObj);
    },

    _validateInput: function(x, y, f) {

        // FACE cannot be undefined
        if (!f) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'noFace'
            }));
        }

        // FACE must be a string
        if (typeof f !== 'string') {
            throw new TypeError(this._messenger.getMessage({
                msg: 'faceNotString'
            }));
        }

        var _f = f.toUpperCase(),
            _x = parseInt(x),
            _y = parseInt(y);

        // Only either INT or Strings that can be parsed to INT are accepted as
        // coordinatres
        if (!Number.isInteger(_x) || !Number.isInteger(_y)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'nonIntCoordinates'
            }));
        }

        // Only positive X and Y are accepted
        if (_x < 0 || _y < 0) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'noNegativeCoordinates'
            }));
        }

        // Only valid FACE words are accepted
        // 'NORTH', 'EAST', 'SOUTH', 'WEST'
        if (!this._isDirectionValid(_f)) {
            throw new TypeError(this._messenger.getMessage({
                msg: 'wrondDirection'
            }));
        }

        return {
            x: _x,
            y: _y,
            f: _f
        };
    },
    _isCommandValid: function() {},
    _isDirectionValid: function(face) {
        return this._config.aDirections.indexOf(face) !== -1;
    },
    _setRobotPosition: function(x, y, f) {
        this._oCurrentPosition.x = x,
            this._oCurrentPosition.y = y,
            this._oCurrentPosition.f = this._config
            .aDirections.indexOf(f);
    },
    _isOutOfPlayground: function(x, y) {
        return this._playground.isOutOfPlayground(x, y);
    },
    _getRobotPosition: function() {
        return {
            x: this._oCurrentPosition.x,
            y: this._oCurrentPosition.y,
            f: this._config.aDirections[this._oCurrentPosition.f]
        }
    },

    /**
     * These methods are only for the sake of testing
     */
    _getIsFirstStepMade: function() {
        return this._isFirstStepMade;
    },
    _isFirstStepMadeFunc: function() {
        if (!this._isFirstStepMade) {
            return this.report({
                msg: 'noInitialCommand'
            });
        } else
            return true;
    },
    _setIsFirstStepMade: function(val) {
        this._isFirstStepMade = val;
    },
    /**
     * Get Messenger instance
     * @return {Messenger} messenger instance
     * @public
     */
    getMessenger: function() {
        return this._messenger;
    },

}

Robot.prototype = Object.create(prototype);
Robot.prototype.constructor = Robot;

/**
 * Проверить, есть ли такая команда
 * @return {Boolean} есть команда - тру, нету - фолс
 */
// Robot.prototype.isCommandValid = function(sCommand) {
//     // TODO: проверка типа, что sCommand - строка
//     return aCommands.indexOf(sCommand) !== -1;
// };

/**
 * Проверить, есть ли такое направление
 * @param  {[string]}  sDirection - north, east, south, west
 * @return {Boolean} - true | false
 */
// function isDirectionValid(sDirection) {
//     // TODO: проверка типа, что sDirection - строка
//     return aDirections.indexOf(sDirection) !== -1;
// }

/**
 * LEFT and RIGHT will rotate the robot 90 degrees in the specified direction
 * without changing the position of the robot.
 * Т.е. только FACE поменять
 * @return {[type]} [description]
 */
// Robot.prototype.left = function() {
//     oCurrentRobotPosition.f = (oCurrentRobotPosition.f - 1) < 0 ? 3 : oCurrentRobotPosition.f - 1;
// };
// Robot.prototype.right = function() {
//     oCurrentRobotPosition.f = (oCurrentRobotPosition.f + 1) > 3 ? 0 : oCurrentRobotPosition.f + 1;
// };
// Robot.prototype.place = function(x, y, f) {
//     // TODO: проверка, что робот ставится на игровое поле, а не куда-то за поле
//     if (isEndOfPlayground(x, y, f)) {
//         this.report(oMsgs.wrongPlace);
//         return;
//     }
//     if (!isDirectionValid(f)) {
//         this.report(oMsgs.wrondDirection);
//         return;
//     }
//     updateRobotPosition(x, y, aDirections.indexOf(f));
// };
// Robot.prototype.move = function() {
//     if (!isFirstStepMade) {
//         this.report(oMsgs.noInitialCommand);
//         return;
//     }
//     // if (!isFirstStepMade && '')
// };

// Robot.prototype.report = function(msg) {
//     console.info(msg);
// };

// Robot.prototype.setRobotPosition = function(x, y, f) {
//     oCurrentRobotPosition.x = x;
//     oCurrentRobotPosition.y = y;

//     // TODO: возможно слово (north, south, т.д.) переделывать на число ЗДЕСЬ,
//     // а не в .move
//     oCurrentRobotPosition.f = f;
// }

// Robot.prototype.getRobotPosition = function() {
//     return oCurrentRobotPosition;
// };

// Robot.prototype.oMsgs = {
//     noInitialCommand: 'Warning! You didn\'t placed a robot first. Use PLACE X, Y, F to position a robot on a playgroud.',
//     wrongPlace: 'Warning! You cannot place the robot in that square, it can fall',
//     wrondDirection: ['Error! No such a direction. Available direction are: ', aDirections.join(', ').toUpperCase()].join(''),
// };



/**
 * Проверка, что не конец игрового поля. Что робот не упадет.
 * @return {Boolean} true | false
 */
// Robot.prototype.isEndOfPlayground = function() {}
