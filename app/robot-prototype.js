'use strict';

var config = require('./config');
module.exports = Robot;


/**
 * Class Robot
 */
function Robot(config, playgroud, messenger) {

    this._config = config,
        this._playground = playgroud,
        this._messenger = messenger,
        this._isFirstStepMade = false,
        // We store FACE as an int, not as a string (such as 'north', 'east', etc.)
        // int references index in a config.aDirections array
        // ['NORTH', 'EAST', 'SOUTH', 'WEST']
        this._oCurrentPosition = {
            x: 0,
            y: 0,
            f: 0
        };
}

var prototype = {
    place: function(x, y, f) {
        var _f = f.toUpperCase();

        if (x < 0 || y < 0) {
            return this.report({
                msg: 'noNegativeCoordinates'
            });
        }
        if (this._isOutOfPlayground(x, y)) {
            return this.report({
                msg: 'wrongPlace'
            });
        }
        if (!this._isDirectionValid(_f)) {
            return this.report({
                msg: 'wrondDirection'
            });
        }
        this._setRobotPosition(x, y, _f);
        if (!this._isFirstStepMade)
            this._isFirstStepMade = true;
        return true;
    },
    move: function() {
        var x, y, sF;
        if (!this._isFirstStepMade) {
            return this.report({
                msg: 'noInitialCommand'
            });
        }
        sF = this._config.aDirections[this._oCurrentPosition.f].toUpperCase();
        x = this._oCurrentPosition.x;
        y = this._oCurrentPosition.y;
        switch (sF) {
            case this._config.aDirections[0]: // north
                ++y;
                break;
            case this._config.aDirections[1]: // east
                ++x;
                break;
            case this._config.aDirections[2]: // south
                --y
                break;
            case this._config.aDirections[3]: // west
                --x;
                break;
        }
        if (this._isOutOfPlayground(x, y)) {
            return this.report({
                msg: 'wrongMove'
            });
        }
        this._setRobotPosition(x, y, sF);
        return true;
        /**
         * сделать проверку установки this._isFirstStepMade.
         * Сначала типа false, после PLACE становится true
         *
         * Изменить this._oCurrentPosition на undefined для всего,
         * покв не будет сделан первый PLACE. После него появляются
         * реальные доступные координаты
         */

    },
    left: function() {
        this._oCurrentPosition.f = (this._oCurrentPosition.f - 1) < 0 ? 3 : this._oCurrentPosition.f - 1;
    },
    right: function() {
        this._oCurrentPosition.f = (this._oCurrentPosition.f + 1) > 3 ? 0 : this._oCurrentPosition.f + 1;
    },
    report: function(msgObj) {
        return this._messenger.getMessage(msgObj);
    },
    _isCommandValid: function() {},
    _isDirectionValid: function(face) {
        return this._config.aDirections.indexOf(face) !== -1;
    },
    _setRobotPosition: function(x, y, f) {
        this._oCurrentPosition.x = +x,
            this._oCurrentPosition.y = +y,
            this._oCurrentPosition.f = this._config.aDirections.indexOf(f.toUpperCase());
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
    _setIsFirstStepMade: function(val) {
        this._isFirstStepMade = val;
    }
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
